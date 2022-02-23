const unnamed = require("../lib");

const server = unnamed({
  port: 3000,
});

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
