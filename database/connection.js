const pg = require("pg");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const options = {
  connectionString: process.env.DATABASE_URL,
  // We shouldn't need this if we're using a local pg db for dev and testing.
  // (When the app is deployed, this setting shouldn't be required for Heroku to connect to its own Postgres db.)
  ssl: {
    rejectUnauthorized: false,
  },
};

const db = new pg.Pool(options);

module.exports = db;
