const userRouter = (route) => {
  route.get((req, res) => {
    res.send({ data: "this is a custom router" });
  });
};
module.exports = userRouter;
