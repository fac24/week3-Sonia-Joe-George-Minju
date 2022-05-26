const layout = require("../layout.js");
const model = require("../database/model.js");

function get(request, response) {
  model
    .getPosts()
    .then((results) => {
      console.log(results);
      if (results.rows.length === 0) {
        return "<h1>Sorry, no posts yet</h1>";
      } else {
        let postsHTML = "";
        const posts = results.rows;
        posts.map((post) => {
          postsHTML = `
              <div class="post-container">
              <p>Username: ${post.username} </p>
              <p>Suggests: ${post.post}
              </div>
              `.concat(postsHTML);
        });
        return postsHTML;
      }
    })
    .then((postsHTML) => response.send(layout("Posts", postsHTML)))
    .catch((error) => {
      console.error(error);
      response.status(500).send("<h1>We couldn't load the posts :(</h1>");
    });
}

module.exports = { get };
