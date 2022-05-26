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
      return bcrypt.compare(password, user.password).then((match) => {
        if (match === true) {
          // If the hashed passwords match, then return the user:
          return user;
        } else {
          // If they don't, then show an error:
          console.error("User cannot be verified (wrong password)");
        }
      });
    }
  });
}

// Joe says: this createUser function creates a user *and* logs them in
// (makes a new session for them).
// That's OK if that's how we want our app to work, but arguably we should
// just have the create session code in the createSession function
// (to avoid duplication :).
// We'll leave it like this for now and just duplicate the code, and we can decide
// if we want to remove the duplication later.
// (The other option is that the createUser function ONLY creates a user, and doesn't
// also log them in. This is how the workshops that we've seen work.)
function createUser(username, password) {
  const sid = crypto.randomBytes(18).toString("base64");
  //  console.log(sid.length);
  return bcrypt
    .hash(password, 10)
    .then((hash) => model.createUser(username, hash))
    .then((userObj) => model.createSession(sid, { user: userObj }));
}

function createSession(username) {
  const sid = crypto.randomBytes(18).toString("base64");
  return model.createSession(sid, { username }).then((sid) => sid);
}

module.exports = {
  COOKIE_OPTIONS,
  createUser,
  verifyUser,
  createSession,
};
