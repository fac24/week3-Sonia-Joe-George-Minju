const pg = require("pg");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const options = {
  connectionString: process.env.DATABASE_URL,
  // We don't need this to deploy on Heroku:
  /* ssl: {
    rejectUnauthorized: false,
  }, */
  // But we do need to set a Config Var on Heroku:
  // PGSSLMODE=no-verify
  // (This is a PostgreSQL env var: https://www.postgresql.org/docs/current/libpq-envars.html)
};

const db = new pg.Pool(options);

module.exports = db;
