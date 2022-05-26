const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require("dotenv");
const home = require("./routes/home.js");
const login = require("./routes/login.js");
const signUp = require("./routes/signUp.js");
const posts = require("./routes/posts.js");

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

server.get("/", home.get);

server.get("/login", login.get);
server.post("/login", login.post);

server.get("/sign-up", signUp.get);
server.post("/sign-up", signUp.post);

server.get("/posts", posts.get);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
