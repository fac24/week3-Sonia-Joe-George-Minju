const model = require("../database/model.js");
const auth = require("../auth.js");
const layout = require("../layout.js");

function get(request, response) {
  const body = `
  <div class="flex-container">
    <h2 class="h2-login">Create an account</h2>
    <form class="style-form" id="sign-up-form" action="sign-up" method="POST">
        <label for="name">Username</label>
        <input type="text" id="username" name="username" require>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" require>
    <button class="btn">Sign up</button>
    <a href="/" class="btn">Home</a>
    </div>
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
