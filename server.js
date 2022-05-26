const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require("dotenv");
const home = require("./routes/home.js");
const login = require("./routes/login.js");
const signUp = require("./routes/signUp.js");
const posts = require("./routes/posts.js");
const addpost = require("./routes/addPost.js");
const { response } = require("express");

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
    res.status(401).send(`<h1>Please Log In or Sign Up to view this page</h1>
        <a href="/login">Log in</a>
        <a href="/sign-up">Sign up</a>`);
  } else {
    next();
  }
}

server.get("/", home.get);

server.get("/login", login.get);
server.post("/login", login.post);

server.get("/sign-up", signUp.get);
server.post("/sign-up", signUp.post);

server.get("/posts", checkAuth, posts.get);

server.post("/addpost", checkAuth, addpost.post);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
