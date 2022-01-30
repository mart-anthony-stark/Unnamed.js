const userRouter = (route) => {
  route.get("/", (req, res) => {
    res.send({ data: "this is a user router" });
  });
  route.post("/", (req, res) => {
    res.send({ data: "this is a user router" });
  });
  route.put("/", (req, res) => {
    res.send({ data: "this is a user router" });
  });
  route.patch("/", (req, res) => {
    res.send({ data: "this is a user router" });
  });
  route.delete("/", (req, res) => {
    res.send({ data: "this is a user router" });
  });
};
module.exports = userRouter;
