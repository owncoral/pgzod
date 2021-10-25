import { createPool as createSlonikPool } from 'slonik';

/**
 * Creates a database connection pool using `slonik`.
 * @param props - Create pool properties.
 */
export function createPool(props: CreatePoolProps = {}): ReturnType<typeof createSlonikPool> {
  const {
    pgdatabase = process.env.PGDATABASE || 'postgres',
    pghost = process.env.PGHOST || '127.0.0.1',
    pgpassword = process.env.PGPASSWORD || '',
    pgport = process.env.PGPORT || '5432',
    pguser = process.env.PGUSER || 'postgres',
  } = props;

  const connectionUri = `postgres://${pguser}:${pgpassword}@${pghost}:${pgport}/${pgdatabase}`;

  return createSlonikPool(connectionUri);
}

/**
 * Create pool properties.
 */
export type CreatePoolProps = {
  /**
   * Database name.
   */
  pgdatabase?: string;
  /**
   * Database host.
   */
  pghost?: string;
  /**
   * Database user password.
   */
  pgpassword?: string;
  /**
   * Database host port.
   */
  pgport?: string | number;
  /**
   * Database user.
   */
  pguser?: string;
}
