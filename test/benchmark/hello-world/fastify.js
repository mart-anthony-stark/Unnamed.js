const fastify = require("fastify");

const app = fastify();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000);
