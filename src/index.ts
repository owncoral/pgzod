#!/usr/bin/env node

import { camelCase, pascalCase } from 'change-case';
import { mkdir, rm, writeFile } from "fs/promises"
import { join } from 'path';
import { sql } from 'slonik';
import type { Arguments, Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import type { CreatePoolProps } from './lib/createPool';
import { createPool } from './lib/createPool';

/**
 * Default command name.
 */
export const command = 'pgzod';
/**
 * Default command description.
 */
export const describe = 'create Zod types for a postgres schema';
/**
 * Default command options.
 */
export type Options = {
  /**
   * Clean run flag
   */
  clean: boolean;
  /**
   * Validators ouput folder
   */
  output: string;
  /**
   * Name of the schema to convert into zod validators.
   */
  schema: string;
} & CreatePoolProps;
/**
 * Yargs default command builder function.
 * Please refer to Yargs documentation to see how it works:
 * https://www.npmjs.com/package/yargs
 */
export const builder: (args: Argv<Record<string, unknown>>) => Argv<Options> = (y) => y
  .options({
    clean: {
      type: 'boolean',
      describe: 'delete the current zod schema folder',
      default: true,
    },
    output: {
      type: 'string',
      describe: 'zod schema output folder',
      default: join(__dirname, '.'),
    },
    pgdatabase: {
      type: 'string',
      describe: 'database name',
      default: 'postgres',
    },
    pghost: {
      type: 'string',
      describe: 'database host',
      default: '127.0.0.1',
    },
    pgpassword: {
      type: 'string',
      describe: 'database user password',
      default: '',
    },
    pgport: {
      type: 'string',
      describe: 'database host port',
      default: '5432',
    },
    pguser: {
      type: 'string',
      describe: 'database user',
      default: 'postgres',
    },
    schema: {
      type: 'string',
      describe: 'schema to convert into zod schema',
      default: 'public',
    },
  })
  // Deactivate the use of environment variables for option configurations.
  .env(true);
/**
 * Yargs default command handler function.
 * Defaults are duplicated to allow importing this function from another module.
 * @param argv - Command options.
 */
export const handler = async (argv: Arguments<Options> | Options): Promise<void> => {
  const {
    clean = true,
    output = join(__dirname, '.'),
    schema = 'public',
    pgdatabase,
    pghost,
    pgpassword,
    pgport,
    pguser,
  } = argv;

  // Create/Re-create the schema output folder
  if (clean) await rm(output, { recursive: true }).catch(() => `output folder ${output} doesn't exist`);
  await mkdir(output).catch(() => `output folder ${output} already exist`);

  try {
    const pool = createPool({
      pgdatabase,
      pghost,
      pgpassword,
      pgport,
      pguser,
    });

    // Get the list of tables inside the schema.
    const tables = await pool.many(sql<InformationSchema>`
      SELECT table_name FROM information_schema.tables WHERE table_schema = ${schema};
    `);

    // Get all the enum custom types definitions.
    const customEnums = await pool.many(sql<CustomEnumTypes>`
      SELECT t.typname as name, concat('"', string_agg(e.enumlabel, '", "'), '"') AS value
      FROM pg_type t
      JOIN pg_enum e on t.oid = e.enumtypid
      JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      WHERE n.nspname = 'franklin'
      GROUP BY name;
    `);

    // Create the types map
    const typesMap = createTypesMap(customEnums.reduce((acc, { name, value }) => ({
      ...acc,
      [name]: `z.enum([${value}])`,
      // Add support for array of custom enum types. From PostgreSQL logs:
      //
      // > When you define a new base type, PostgreSQL automatically provides support for arrays
      // > of that type. The array type typically has the same name as the base type with the
      // > underscore character (_) prepended.
      [`_${name}`]: `z.array(z.enum([${value}]))`
    }), {}));

    // The index variable will hold all the lines for the ./index.ts file.
    const index: string[] = [];

    for (const { table_name } of tables) {
      const columns = await pool.many(sql<ColumnsInformation>`
      SELECT column_name, ordinal_position, column_default, is_nullable, data_type, udt_name
      FROM information_schema.columns
      WHERE table_name = ${table_name}
      ORDER BY ordinal_position;
    `)

      const template = [];
      // Remove editorconfig checks on auto-generated files.
      template.push(`import { z } from 'zod';\n`);

      // Add json parsing according to Zod documentation.
      // https://github.com/colinhacks/zod#json-type
      if (columns.some((column) => column.udt_name === 'jsonb')) {
        template.push(`type Literal = boolean | null | number | string;`);
        template.push(`type Json = Literal | { [key: string]: Json } | Json[];`);
        template.push(`const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);`);
        template.push(`const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>`);
        template.push(`  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])`);
        template.push(`);\n`);
      }

      const name = pascalCase(table_name);
      template.push(`export const ${name} = z.object({`);

      for (const column of columns) {
        const name = column.column_name;
        let line = `${name}: `;

        const type = typesMap[column.udt_name];
        line += type

        const isNullable = column.is_nullable === 'YES';
        line += isNullable ? '.nullable().optional()' : '';

        const isOptional = column.column_default !== null;
        line += isOptional ? '.optional()' : '';

        template.push(`  ${line},`);
      }

      template.push(`});\n`);
      template.push(`export type ${name}T = z.infer<typeof ${name}>;\n`);

      const file = camelCase(name);
      await writeFile(join(output, `${file}.ts`), template.join('\n'));

      index.push(`export type { ${name}T } from './${file}';`);
      index.push(`export { ${name} } from './${file}';`);
    }

    index.push('\n');
    await writeFile(join(output, `index.ts`), index.join('\n'));
  } catch (err) {
    console.error(err);
  }
};
// =========
// Functions
// =========
/**
 * Returns a PostgreSQL to Zod types map.
 * @param type - PostgreSQL data type.
 */
function createTypesMap(customEnumsEntries: Record<string, string>) {
  /**
   * Map that translate PostgreSQL data types to Zod functions.
   */
  const ZOD_TYPES_OVERRIDE: Record<string, string> = {
    bool: `z.boolean()`,
    citext: `z.string()`,
    // TODO: Find a better way to handle dates.
    date: `z.string()`,
    float8: `z.number()`,
    int4: `z.number().int()`,
    jsonb: `jsonSchema`,
    numeric: `z.number()`,
    text: `z.string()`,
    // TODO: Find a better way to handle dates.
    timestamptz: `z.string()`,
    uuid: 'z.string().uuid()',
    varchar: `z.string()`,
  };
  const map = { ...ZOD_TYPES_OVERRIDE, ...customEnumsEntries }
  const proxy = new Proxy(map, {
    get: (object, prop: string) => prop in object ? object[prop] : `z.${prop}()`,
  });
  return proxy;
}
// =====
// Types
// =====
/**
 * Represents the output of the information_schema.tables table.
 */
type InformationSchema = {
  table_name: string;
}
/**
 * Represents the output of a query to get the list of custom enum types.
 */
type CustomEnumTypes = {
  /**
   * Name of the custom enum type.
   */
  name: string;
  /**
   * List of valid enum values as a concatenated list of string separated by a comma (,).
   */
  value: string;
}
/**
 * Represents the output of the information_schema.colums table.
 */
type ColumnsInformation = {
  column_name: string;
  ordinal_position: number;
  column_default: string | null;
  is_nullable: 'YES' | 'NO';
  data_type: string;
  udt_name: string;
}
// =================
// Standalone Module
// =================
if (require.main === module) {
  yargs(hideBin(process.argv))
    .env(true)
    .command({
      command: '$0',
      describe,
      builder,
      handler,
    })
    .parseAsync();
}
