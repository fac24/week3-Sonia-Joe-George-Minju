const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const model = require("./database/model");

const COOKIE_OPTIONS = {
  httpOnly: true,
  // Do we want our cookies to expire after 60s? :/
  // maxAge: 600000,
  sameSite: "strict",
  signed: true,
};

function verifyUser(username, password) {}

function createUser(username, password) {
  return bcrypt
    .hash(password, 10)
    .then((hash) => model.createUser(username, hash));
}

function createSession(username) {
  const sid = crypto.randomBytes(18).toString("base64");
  model.createSession(sid, { username });
}

function saveUserSession() {}

module.exports = {
  COOKIE_OPTIONS,
  createUser,
  saveUserSession,
  verifyUser,
  createSession,
};
