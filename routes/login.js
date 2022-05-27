const auth = require("../auth.js");
const layout = require("../layout.js");

function get(request, response) {
  const html = layout(
    "Login",
    /*html*/ `
    <h1>Log in</h1>
    <form id="sign-up-form" action="login" method="POST">
      <label for="username">Username</label>
      <input type="text" id="username" name="username">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button>Log in</button>
      <a href="/">Back to Home</a>
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
    .then((verifyResponse) => {
      // What the above promise returns is either "false" (boolean) if the username/pass don't match
      // or the user object, if the username and pass do match. "verifyResponse" isn't the best name for this :)
      //console.log("///", verifyResponse);
      if (verifyResponse === false) {
        // Username or password didn't match, so show the user an error
        throw new Error();
      } else {
        return auth.createSession(verifyResponse);
      }
    })
    .then((sid) => {
      // And finally, send the user a signed cookie with this session ID:
      //console.log(sid);
      response.cookie("sid", sid, auth.COOKIE_OPTIONS);
      // The user is now logged-in! So redirect them to .. somewhere (probably the home page).
      response.redirect("/");
    })
    .catch(() => {
      //console.log(error);
      response.status(401).send(`<h1>Oops, something went wrong!</h1>`);
    });
}

module.exports = { get, post };
