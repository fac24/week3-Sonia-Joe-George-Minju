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

function verifyUser(username, password) {
  // Get the user from the database with the relevant username:
  return model.getUser(username).then((user) => {
    if (user === undefined) {
      // If there are no results then show an error:
      console.error("User cannot be verified (no such user)");
    } else {
      // If there is one result, then compare the password with the stored (hashed) password:
      bcrypt.compare(password, user.password).then((match) => {
        if (match === true) {
          // If the hashed passwords match, then return the user:
          //   console.log(user);
          return user;
        } else {
          // If they don't, then show an error:
          console.error("User cannot be verified (wrong password)");
        }
      });
    }
  });
}

function createUser(username, password) {
  const sid = crypto.randomBytes(18).toString("base64");
  //  console.log(sid.length);
  return bcrypt
    .hash(password, 10)
    .then((hash) => model.createUser(username, hash))
    .then((userObj) => model.createSession(sid, { user: userObj }));
}

function createSession(username) {
  model.createSession(sid, { username });
}

module.exports = {
  COOKIE_OPTIONS,
  createUser,
  verifyUser,
  createSession,
};
