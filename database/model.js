const db = require("./connection.js");

function getUser(username) {
  const SELECT_USER = `
    SELECT id, username, password FROM users WHERE username=$1
  `;
  return db.query(SELECT_USER, [username]).then((result) => result.rows[0]);
}

// Minju and Joe wrote this by accident but it's not for login so maybe Sonia and George want to check/rewrite :)
function createUser(username, password) {
  const INSERT_USER = `
    INSERT INTO users (username, password) VALUES ($1, $2)
    RETURNING id, username
  `;
  return db
    .query(INSERT_USER, [username, password])
    .then((result) => result.rows[0]);
}

function createSession(sessionId, dataObj) {
  const INSERT_SESSION = `
    INSERT INTO sessions (sid, data) VALUES ($1, $2)
    RETURNING sid
  `;
  return db
    .query(INSERT_SESSION, [sessionId, dataObj])
    .then((result) => result.rows[0]["sid"]);
}

module.exports = {
  getUser,
  createSession,
  createUser,
};
