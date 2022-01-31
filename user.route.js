const userRouter = (route) => {
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
    });
  });
  route.put("/", (req, res) => {
    res.send({
      data: "this is a user router",
      method: req.method,
      url: req.url,
    });
  });
  route.patch("/", (req, res) => {
    res.send({
      data: "this is a user router",
      method: req.method,
      url: req.url,
    });
  });
  route.delete("/", (req, res) => {
    res.send({
      data: "this is a user router",
      method: req.method,
      url: req.url,
    });
  });
};
module.exports = userRouter;
