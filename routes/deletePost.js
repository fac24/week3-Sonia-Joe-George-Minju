const { response } = require("express");
const model = require("../database/model.js");

function post(req, res) {
  const { post_id } = req.body;
  // model.getPosts(body).then((result) => result.rows[0]);
  //.then((posts) => model.deletePost())

  // The delete form gives us the post id
  // The other thing we need to know is the user id
  // We can get the user id the same we get it in the addposts bit:

  // 1. Get the sid from the user's sid cookie
  const sid = req.signedCookies.sid;
  // 2a. Query the database sessions table to see if the sid exists
  // 2b. If the sid exists, return the sid and the data column (which contains the user object)
  model.getSession(sid).then((result) => {
    //console.log(`result.data.user.id: ${result.data.user.id}`);
    //console.log(`post_id: ${post_id}`);
    model
      .deletePost(post_id, result.data.user.id)
      .then(() => res.redirect("/"));
  });
}

// Need to make sure the post hasn't been altered in dev tools, e.g. getposts from db and check against the input
// Check the user by their session id is the same as the user they're trying to delete

module.exports = { post };
