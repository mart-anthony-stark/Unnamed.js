module.exports = (router) => {
  router.GET("/", (req, res) => {
    res.send("Auth");
  });
  router.GET("/:id", (req, res) => {
    res.send({ id: req.params.id });
  });
};
