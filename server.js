const express = require("express");
const home = require("./routes/home.js");

const server = express();

//Static files e.g. css, images...
const staticHandler = express.static("public");
server.use(staticHandler);

const bodyHandler = express.urlencoded({ extended:false });

server.get("/", home.get)



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))