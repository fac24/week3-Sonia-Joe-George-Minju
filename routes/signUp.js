const model = require("../database/model.js");
const auth = require("../auth.js");
const layout = require("../layout.js");

function get(request, response) {
  const body = `
    <h1>Create an account</h1>
    <form id="sign" action="sign-up" method="POST">
        <label for="name">Username</label>
        <input type="text" id="username" name="username" require>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" require>
    <button>Sign up</button>
  </form>
    `;
  response.send(layout("Sign-up", body));
}

function post(request, response) {
  const { username, password } = request.body;
  model.getUser(username).then((user) => {
    if (user !== undefined) {
      response.redirect("/");
    } else {
      auth.createUser(username, password).then((sid) => {
        response.cookie("sid", sid, auth.COOKIE_OPTIONS).redirect("/");
      });
    }
  });
  /*  */ //Need to create session Id for it before redirecting to next page
}

module.exports = { get, post };
