# Unnamed.js

A minimal node http server framework

[Getting Started](https://github.com/mart-anthony-stark/Unnamed.js#getting-started)
[Routes](https://github.com/mart-anthony-stark/Unnamed.js#routes)

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

![server](https://github.com/mart-anthony-stark/Unnamed.js/blob/main/docs/start%20server.png?raw=true)

### Routes

This framework supports the 5 commonly-used HTTP request methods. The methods can be accessed through the returned server object

- GET
- POST
- PUT
- PATCH
- DELETE

```javascript
server.GET("/", (request, response) => {
  response.code(200).send({ method: request.method, msg: "Hello world" });
});
server.POST("/", (request, response) => {
  response.code(200).send({ method: request.method, msg: "Hello world" });
});
server.PUT("/", (request, response) => {
  response.code(200).send({ method: request.method, msg: "Hello world" });
});
server.PATCH("/", (request, response) => {
  response.code(200).send({ method: request.method, msg: "Hello world" });
});
server.DELETE("/", (request, response) => {
  response.code(200).send({ method: request.method, msg: "Hello world" });
});
```

### Response methods

- code() - This method sets the response status code. If you want to know more about HTTP status codes, visit [MDN Web Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
  - Syntax:
  ```typescript
  const status: number = 200;
  server.code(200);
  ```
- send() - This method basically sends the HTTP response. The body parameter can be a String or a Buffer object or an object or an Array. It accepts a single parameter body that describe the body which is to be sent in the response.
  - Syntax:
  ```javascript
  const body = {
    id: 123456,
    name: Mart Anthony Salazar,
    age: 19
  }
  server.send(body)
  ```
