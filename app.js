const lib = require("./src");

const app = lib({
  port: 3000,
  init: () => {
    console.log("App is running");
  },
});

app.middleware(() => {
  console.log("This is a middleware");
});

app.registerRouter({
  prefix: "user",
  router: require("./user.route"),
});

app.get("/", (req, res) => {
  res.code(401).send({ error: "Unauthorized" });
});
app.post("/", (req, res) => {
  console.log(req.body);
  res.code(200).send({ Created: req.body });
});
app.put("/", (req, res) => {
  res.send({ msg: "Modified" });
});
app.patch("/", (req, res) => {
  res.code(200).send({ msg: "Updated" });
});
app.delete("/", (req, res) => {
  res.code(200).send("Ok");
});
