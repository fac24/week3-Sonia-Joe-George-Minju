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

function getSession(sid) {
  const SELECT_SESSION = `
    SELECT sid, data FROM sessions WHERE sid=$1
  `;
  return db.query(SELECT_SESSION, [sid]).then((result) => result.rows[0]);
}

function getPosts() {
  const SELECT_POSTS = `
    SELECT users.username, posts.post, posts.id
    FROM users
    INNER JOIN posts
    ON users.id = posts.user_id AND posts.id = $1`;
  return db.query(SELECT_POSTS, [id]).then((results) => results);
}

function createPost(user_id, post) {
  const INSERT_POST = `
    INSERT INTO posts (user_id, post) VALUES ($1, $2)
    RETURNING id
  `;
  return db
    .query(INSERT_POST, [user_id, post])
    .then((result) => result.rows[0]);
}

function deletePost(post) {
  const DELETE_POST = `
    DELETE FROM posts WHERE id = $1 AND post = $2 AND user_id = 
      (SELECT id FROM users WHERE username = $3) ;
  `;
  return db.query(DELETE_POST, [post.id, post.post, post.username]);
}

module.exports = {
  getUser,
  createSession,
  createUser,
  getSession,
  getPosts,
  createPost,
  deletePost,
};
