const layout = require("../layout.js");

function get(request, response) {
  const html = layout(
    "Title",
    `
        <h1>HIYA</h1>
        <a href="/login">Login</a>
        <a href="/sign-up">Sign Up</a>
    `
  );

  response.send(html);
}

module.exports = { get };
