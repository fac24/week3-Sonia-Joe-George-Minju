const model = require("../database/model.js");
const auth = require("../auth.js");
const layout = require("../layout.js");

function get(request, response) {
  const body = `
    <h1>Create an account</h1>
    <form action="sign-up" method="POST">
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
  auth.createUser(username, password).then(() => response.redirect("/"));
}

module.exports = { get, post };
