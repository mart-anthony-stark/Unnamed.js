const framework = require("./src");

const app = framework({
  port: 3000,
  init: () => {
    console.log("App is running");
  },
});

app.middleware((req, res, done) => {
  console.log("This is middleware 1");
  req.user = "mart";
  done();
});

app.middleware((req, res, done) => {
  console.log("This is middleware 2");
  console.log(req.user);
  done();
});

app.registerRouter({
  prefix: "user",
  router: require("./user.route"),
});

app.get("/", (req, res) => {
  console.log(req.user);
  console.log({ name: req.query.name });
  res.code(401).send({ data: { user: req.user }, error: "Unauthorized" });
});

app.get("/:id", (req, res) => {
  console.log(req.params);
  res.code(200).send({ id: req.params.id });
});

app.post("/", (req, res) => {
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
