const express = require("express");
const home = require("./routes/home.js");
const login = require("./routes/login.js");
const signUp = require("./routes/signUp.js");

const server = express();

//Static files e.g. css, images...
const staticHandler = express.static("public");
server.use(staticHandler);
const bodyHandler = express.urlencoded({ extended: false });
server.use(bodyHandler);

server.get("/", home.get);

server.get("/login", login.get);
server.post("/login", login.post);

server.get("/sign-up", signUp.get);
server.post("/sign-up", signUp.post);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
