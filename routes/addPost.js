const model = require("../database/model.js");

function post(request, response) {
  // Get the user-submitted data by destructuring the request.body object:
  const { post } = request.body;

  // console.log(`Sonia & Joe log addPost.js: ${post}`);

  // Get the user id of the user that's logged in (in other words, the user that has a valid session)

  // 1. Get the sid from the user's sid cookie
  const sid = req.signedCookies.sid;
  // 2. Query the database sid table to see if the sid exists
  // 3. If the sid exists, return the sid and the data column (which contains the user object)
  model.getSession(sid).then((result) => {
    result.rows[0];
    // 4. From the second ("data") column, get the user object, and from the user object, get the username
    // 5. Query the database users table to see if the user with this username exists (they should!)
    // 6. If the user exists, return their user_id from the database
  });

  // 7. Now we have the user_id, so we can go ahead with the createPost function below :)

  // Add a new post to the database (using the user id we got above)
  model.createPost(user_id, post).then((result) =>
    // Redirect the user to the posts page:
    response.redirect("/posts")
  );
}

module.exports = { post };
