const auth = require("../auth.js");
const layout = require("../layout.js");

function get(request, response) {
  const html = layout(
    "Login",
    /*html*/ `
    <h1>Log in</h1>
    <form action="login" method="POST">
      <label for="username">Username</label>
      <input type="text" id="username" name="username">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button>Log in</button>
    </form>
  `
  );
  response.send(html);
}

function post(request, response) {
  // Get the username and password that the user entered in the login form:
  const { username, password } = request.body;
  console.log("Logging in...");
  auth
    // Check if the password matches (done in auth.js):
    .verifyUser(username, password)
    // If the password matches, then create a new, unique session ID for
    // the authenticated user and store it in the database (both done in auth.js)
    .then((user) => auth.createSession(user.username))
    .then((sid) => {
      // And finally, send the user a signed cookie with this session ID:
      //console.log(sid);
      response.cookie("sid", sid, auth.COOKIE_OPTIONS);
      // The user is now logged-in! So redirect them to .. somewhere (probably the home page).
      response.redirect("/posts");
    });
}

module.exports = { get, post };
