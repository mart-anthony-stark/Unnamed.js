const unnamed = require("unnamed-js");

const server = unnamed({ port: 3000 });

const { GET, POST, PUT, PATCH, DELETE } = server;

GET("/", (req, res) => {
  res.send("Hello world");
});
