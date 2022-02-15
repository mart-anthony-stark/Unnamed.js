const userRouter = (router) => {
  router.GET("/", (req, res) => {
    res.send("USERS");
  });
};

module.exports = userRouter;
