const model = require("../database/model.js");
const auth = require("../auth.js");
const layout = require("../layout.js");

function get(request, response) {
  const body = `
  <div class="flex-container">
  <h2 class="h2-headings">Create an account</h2>
    <form class="style-form" id="sign-up-form" action="sign-up" method="POST">
        <label for="username">
          Username
          <span aria-hidden="true">*</span>
        </label>
        <input type="text" id="username" name="username" required>
        <label for="password">
          Password
          <span aria-hidden="true">*</span>
        </label>
        <input    
          type="password" 
          id="password" 
          name="password" 
          aria-describedby="instruction" 
          required
          pattern=".*\\d.*"
          minlength="8"
        >
        <div id="passwordError"></div>
        <div id="instruction">Passwords must contain at least one letter and one number, and contain at least 8 characters.</div>
    <button class="btn" >Sign up</button>
    <a href="/" class="btn">Home</a>
  </form>
  </div>
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
