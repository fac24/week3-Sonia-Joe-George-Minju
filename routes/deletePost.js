const { response } = require("express");
const model = require("../database/model.js");

function post(req, res) {
  const body = req.body;
  model.getPosts(body).then((result) => result.rows[0]);
  //.then((posts) => model.deletePost())
  res.redirect("/posts");
}

// Need to make sure the post hasn't been altered in dev tools, e.g. getposts from db and check against the input
// Check the user by their session id is the same as the user they're trying to delete

module.exports = { post };
