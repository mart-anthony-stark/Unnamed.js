const unnamed = require("unnamed-js");

const server = unnamed(
  {
    port: 3000,
  },
  { log: false }
);

server.middleware((req, res) => {
  console.log("middleware");
  req.user = "Mart";
});

server.registerRouter({
  prefix: "auth",
  router: require("./auth.route"),
});

server.GET("/user", (req, res) => {
  res.send("Hello" + req.user);
});
server.POST("/user", (req, res) => {
  res.send("POST" + req.user);
});
server.PUT("/user", (req, res) => {
  res.send("PUT" + req.user);
});
server.PATCH("/user", (req, res) => {
  res.send("PATCH" + req.user);
});
server.DELETE("/user", (req, res) => {
  res.send("DELETE" + req.user);
});
server.GET("/user/:id", (req, res) => {
  res.send({ userId: req.params.id });
});
