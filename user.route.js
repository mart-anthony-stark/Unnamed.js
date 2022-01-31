const userRouter = (route) => {
  route.get("/", { beforeEnter: [] }, (req, res) => {
    res.send({
      data: "this is a user router",
      method: req.method,
      url: req.url,
    });
  });

  route.get("/name", (req, res) => {
    res.send({
      data: "this is a user router",
      method: req.method,
      url: req.url,
    });
  });
  route.post("/", (req, res) => {
    res.send({
      data: "this is a user router",
      method: req.method,
      url: req.url,
      body: req.body,
    });
  });
  route.put("/", (req, res) => {
    res.send({
      data: "this is a user router",
      method: req.method,
      url: req.url,
      body: req.body,
    });
  });
  route.patch("/", (req, res) => {
    res.send({
      data: "this is a user router",
      method: req.method,
      url: req.url,
      body: req.body,
    });
  });
  route.delete("/", (req, res) => {
    res.send({
      data: "this is a user router",
      method: req.method,
      url: req.url,
      body: req.body,
    });
  });
};
module.exports = userRouter;
