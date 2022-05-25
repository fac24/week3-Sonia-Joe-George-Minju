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
  auth.verifyUser(username, password);
  // console.log("///", auth.verifyUser(username, password));

  // (We will have to hash the submitted password, because the password stored in the database is hashed!)
  // If the password matches, then:
  // -  Create a new, unique session ID for the authenticated user (auth.js)

  //    and store it in the database (in the sessions table). (model.js)

  // - Send the user a signed cookie with this session ID. (here!)

  // The user is now logged-in! So redirect them to .. somewhere (probably the home page).

  response.redirect("/");
}

module.exports = { get, post };
