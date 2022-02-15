const userRouter = (route) => {
  route.GET("/", { beforeEnter: [] }, (req, res) => {
    res.send({
      data: "this is a user router",
      method: req.method,
      url: req.url,
    });
  });

  route.GET("/name", (req, res) => {
    res.send({
      data: "this is a user router",
      method: req.method,
      url: req.url,
    });
  });
  route.POST("/", (req, res) => {
    res.send({
      data: "this is a user router",
      method: req.method,
      url: req.url,
      body: req.body,
    });
  });
  route.PUT("/", (req, res) => {
    res.send({
      data: "this is a user router",
      method: req.method,
      url: req.url,
      body: req.body,
    });
  });
  route.PATCH("/", (req, res) => {
    res.send({
      data: "this is a user router",
      method: req.method,
      url: req.url,
      body: req.body,
    });
  });
  route.DELETE("/", (req, res) => {
    res.send({
      data: "this is a user router",
      method: req.method,
      url: req.url,
      body: req.body,
    });
  });
};
module.exports = userRouter;
