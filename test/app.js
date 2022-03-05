const lib = require("../index");

const server = lib({ port: 3000 });

server.GET("/", (req, res) => {
  res.send("<a href='#'>Hello</a>");
});
