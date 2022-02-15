# Unnamed.js

A minimal node http server framework

[Getting Started](https://github.com/mart-anthony-stark/Unnamed.js#getting-started)

### Getting started

Call the unnamed function and assign it to a variable

```javascript
const unnamed = require("./src");

const server = unnamed({
  port: 3000,
  init: () => {
    // This will run as the server initializes
    console.log("App is running");
  },
});
```

- Server started
  ![server](https://github.com/mart-anthony-stark/Unnamed.js/blob/main/docs/start%20server.png?raw=true)

### Routes

```javascript
server.get("/", (req, res) => {
  res.code(401).send({ msg: "Hello world" });
});
```
