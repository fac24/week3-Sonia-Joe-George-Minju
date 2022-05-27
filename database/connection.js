const pg = require("pg");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const options = {
  connectionString: process.env.DATABASE_URL,
  // Apparently we need this to stil deploy on heroku
  /* ssl: {
    rejectUnauthorized: false,
  }, */
};

const db = new pg.Pool(options);

module.exports = db;
