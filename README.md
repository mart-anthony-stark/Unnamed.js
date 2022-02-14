# Unnamed.js

A minimal node http server framework

[Getting Started](https://github.com/mart-anthony-stark/Unnamed.js#getting-started)

### Getting started
Call the unnamed function and assign it to a variable
```javascript
const unnamed = require("./src");

const app = unnamed({
  port: 3000,
  init: () => {
    // This will run when as the server initializes
    console.log("App is running");
  },
});
```
