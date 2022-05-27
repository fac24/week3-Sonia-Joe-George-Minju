const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require("dotenv");
// const home = require("./routes/home.js");
const login = require("./routes/login.js");
const signUp = require("./routes/signUp.js");
const posts = require("./routes/posts.js");
const addpost = require("./routes/addPost.js");
const deletePost = require("./routes/deletePost.js");
const { response } = require("express");
const layout = require("./layout.js")

const server = express();

//Static files e.g. css, images...
const staticHandler = express.static("public");
server.use(staticHandler);
const bodyHandler = express.urlencoded({ extended: false });
server.use(bodyHandler);
// joe says: we can probably use .env as we've required dotenv above now :¬)
// OK COOKIE_SECRET is still not working let's fix that later :(
// :((((
server.use(cookieParser("letsuseastringinherefornow")); //COOKIE_SECRET))//ok

function checkAuth(req, res, next) {
  const sid = req.signedCookies.sid;
  if (!sid) {
    res.status(401).send(layout(`Moo Lah Lah`,`
    <div class="flex-container">
    <h1>Moo Lah Lah</h1>
    <p class="tagline">Making Cows Happy since 25/06, 12.25 p.m. </p>
      <h2>Ready to share your fav plant-based milk?</h1>
        <a class="btn" href="/login">Log in</a>
        <a class="btn" href="/sign-up">Sign up</a>
    </div>`));
  } else {
    // Joe says: arguably we should check here that the current session ID is valid
    // (which needs to happen from multiple places, so is being handled by auth.js)
    next();
  }
}

//server.get("/", checkAuth, home.get);

server.get("/login", login.get);
server.post("/login", login.post);

server.get("/sign-up", signUp.get);
server.post("/sign-up", signUp.post);

server.get("/", checkAuth, posts.get);

// Joe says: did checkAuth break this route at some point? It seems to work now, fingers crossed!
// Hmm not really sure it did at one point but think it works:.,
server.post("/add-post", checkAuth, addpost.post);

server.post("/delete-post", checkAuth, deletePost.post);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
