const unnamed = require("unnamed-js");

const PORT = process.env.PORT || 8080;
const server = unnamed({ port: PORT });
const { GET } = server;

server.router(require("./routers"));

GET("/", (request, response) => {
  response.send("Hello world");
});
