# Unnamed.js

A minimal node http server framework

### Getting started

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
