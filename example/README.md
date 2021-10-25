# Example

Here is the result of running `pgzod` against the [`pagila schema`][pagila].

# Procedure

> Before yoy begin, load all the connection details as valid [PostgreSQL environment variables][postgresql-env-vars].

Create a new database and load the [schema][pagila] into it.

```sh
# Create the pagila database
psql -c "CREATE DATABASE pagila;"

# Load the pagila-schema
PGDATABASE=pagila psql -f pagila-schema.sql
```

Then run `pgzod` with the output folder set to `./pagila`.

```sh
npx pgzod --output=./pagila --pgdatabase=pagila
```

That's it. Enjoy your types.

[pagila]: https://github.com/devrimgunduz/pagila/blob/master/pagila-schema.sql
[postgresql-env-vars]: https://www.postgresql.org/docs/current/libpq-envars.html
