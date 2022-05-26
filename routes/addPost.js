const model = require("../database/model.js");

function post(request, response) {
  // Get the user-submitted data by destructuring the request.body object:
  const { post } = request.body;

  // 1. Get the sid from the user's sid cookie
  const sid = request.signedCookies.sid;
  // 2. Query the database sid table to see if the sid exists
  // 3. If the sid exists, return the sid and the data column (which contains the user object)
  model.getSession(sid).then((result) => {
    console.log(result);
    model
      .createPost(result.data.user.id, post)
      .then(() => response.redirect("/"));
    // 4. From the second ("data") column, get the user object, and from the user object, get the user id
    // 5. Now we have the user_id, so we can go ahead with the createPost function below :)
  });
}

module.exports = { post };
