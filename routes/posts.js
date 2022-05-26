const layout = require("../layout.js");
const model = require("../database/model.js");

function get(request, response) {
  let html = `
  <form action="/add-post" method="POST">
    <label for="username">
      Username
    </label>

    <label for="post">
      What's your go-to plant-based milk? ;)
      <span aria-hidden="true">*</span>
    </label>
    <input id="post" type="text" name="post" required />

    <button>Submit</button>
  </form>
`;

  model
    .getPosts()
    .then((results) => {
      // console.log(results);
      if (results.rows.length === 0) {
        return "<p>Sorry, no posts yet</p>";
      } else {
        let postsHTML = "";
        const posts = results.rows;
        // console.log(posts);
        posts.map((post) => {
          postsHTML = `
              <div class="post-container">
              <p>Username: ${post.username} </p>
              <p>Suggests: ${post.post} </p>
              <form action="/delete-post" method="POST">
                <button class="delete-button" name="id" value="${post.id}" aria-label="Delete ${post.post}">
                    &times;
                </button>
              </div>
              `.concat(postsHTML);
        });
        return postsHTML;
      }
    })
    .then((postsHTML) => response.send(layout("Posts", html.concat(postsHTML))))
    .catch((error) => {
      console.error(error);
      response.status(500).send("<h1>We couldn't load the posts :(</h1>");
    });
}

module.exports = { get };
