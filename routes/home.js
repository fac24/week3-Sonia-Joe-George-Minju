const layout = require("../layout.js");
const model = require("../database/model.js");

function get(request, response) {
  const sid = request.signedCookies.sid;
  //console.log(sid);
  let html = "";
  //model.getSession(sid).then((session) => console.log(session));

  if (sid) {
    model.getSession(sid).then((session) => {
      html = layout(
        `Hello ${session.data.username}`,
        `
        <h1>Hello ${session.data.username}</h1>
        <!-- <form action="/log-out" method="POST">
          <button>Log out</button>
        </form> -->
        `
      );
      response.send(html);
    });
  } else {
    html = layout(
      "Title",
      `
        <h1>Please login or sign up</h1>
        <a href="/login">Login</a>
        <a href="/sign-up">Sign Up</a>
      `
    );
    response.send(html);
  }
}

module.exports = { get };
