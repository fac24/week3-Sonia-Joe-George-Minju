const layout = require("../layout.js");
const model = require("../database/model.js");

function get(request, response) {
  let html = layout(
    `Posts`,
        /*html*/
    `
  <div class="flex-container">
  <h2 class="h2-headings">Share your go-to plant-based milk </h2>
  <form class="style-form" action="/add-post" method="POST">
    <label for="username">
      Username
    </label>

    <label for="post">
      Tell us more about your favourite plant-based milk 🐮
      <span aria-hidden="true">*</span>
    </label>
    <input id="post" type="text" name="post" required />
    <button class="btn">Submit</button>
  </form>
  </div>
 `
  );

  model
    .getPosts()
    .then((results) => {
      // console.log(results);
      if (results.rows.length === 0) {
        return `<p class="post-container">What an honour! You're the first one to post something 😊</p>`;
      } else {
        let postsHTML = "";
        const posts = results.rows;
        // console.log(posts);

        const sid = request.signedCookies.sid;
        return model.getSession(sid).then((result) => {
          //console.log(`result.data.user.id: ${result.data.user.id}`);

          posts.map((post) => {
            //console.log(`post.user_id: ${post.user_id}`);
            let deleteButton = "";
            if (post.user_id === result.data.user.id) {
              deleteButton = /*html*/ `
              <form action="/delete-post" method="POST">
                <button class="delete-button" name="post_id" value="${post.id}" aria-label="Delete ${post.post}">
                  &times;
                </button>
              </form>`;
            }

            postsHTML = `
            <div class="flex-container post-container">
              <p>Username: ${post.username} </p>
              <p>Suggests: ${post.post} </p>
              ${deleteButton}  
              </div>
            `.concat(postsHTML);
          });

          return postsHTML;
        });
      }
    })
    .then((postsHTML) => response.send(layout("Posts", html.concat(postsHTML))))
    .catch((error) => {
      console.error(error);
      response.status(500).send("<h1>We couldn't load the posts :(</h1>");
    });
}

module.exports = { get };
