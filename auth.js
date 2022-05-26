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
    //console.log(user);
    if (user === undefined) {
      // If there are no results then show an error:
      console.error("User cannot be verified (no such user)");
      return false;
    } else {
      // If there is one result, then compare the password with the stored (hashed) password:
      return bcrypt.compare(password, user.password).then((match) => {
        if (match === true) {
          console.log("Username and password match :)");
          // If the hashed passwords match, then return the user:
          return user;
        } else {
          // If they don't, then show an error:
          console.error("User cannot be verified (wrong password)");
          return false;
        }
      });
    }
  });
}

// Joe says: this createUser function creates a user *and* logs them in
// (makes a new session for them).
// That's OK if that's how we want our app to work, we just need to remember that's how it works :)
function createUser(username, password) {
  const sid = crypto.randomBytes(18).toString("base64");
  return bcrypt
    .hash(password, 10)
    .then((hash) => model.createUser(username, hash))
    .then((user) => createSession(user));
}

function createSession(user) {
  const sid = crypto.randomBytes(18).toString("base64");
  return model.createSession(sid, { user }).then((sid) => sid);
}

// function verifySession(sid) {}

module.exports = {
  COOKIE_OPTIONS,
  createUser,
  verifyUser,
  createSession,
};
