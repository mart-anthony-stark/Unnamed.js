const routes = [
  {
    prefix: "users",
    router: require("./user.route"),
  },
  {
    prefix: "auth",
    router: require("./auth.route"),
  },
];

module.exports = routes;
