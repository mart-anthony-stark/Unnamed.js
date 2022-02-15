const authRouter = (router) => {
  router.GET("/login", (request, response) => {
    response.send("login route");
  });
};

module.exports = authRouter;
