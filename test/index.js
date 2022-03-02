const unnamed = require("unnamed-js");

const server = unnamed(
  {
    port: 3000,
  },
  { log: false }
);

const { GET, POST, PUT, PATCH, DELETE } = server;

server.middleware((req, res) => {
  console.log("middleware");
  req.user = "Mart";
});

server.registerRouter({
  prefix: "auth",
  router: require("./auth.route"),
});

GET("/user", (req, res) => {
  res.send("Hello" + req.user);
});
POST("/user", (req, res) => {
  res.send("POST" + req.user);
});
PUT("/user", (req, res) => {
  res.send("PUT" + req.user);
});
PATCH("/user", (req, res) => {
  res.send("PATCH" + req.user);
});
DELETE("/user", (req, res) => {
  res.send("DELETE" + req.user);
});
GET("/user/:id", (req, res) => {
  res.send({ userId: req.params.id });
});
