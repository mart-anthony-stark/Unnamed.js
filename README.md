# Unnamed.js

A minimal node http server framework by [Mart Anthony Salazar](https://github.com/mart-anthony-stark)

- [Getting Started](https://github.com/mart-anthony-stark/Unnamed.js#getting-started)
- [Middlewares](https://github.com/mart-anthony-stark/Unnamed.js#middlewares)
- [Routes](https://github.com/mart-anthony-stark/Unnamed.js#routes)
- [Request](https://github.com/mart-anthony-stark/Unnamed.js#request-object)
- [Response](https://github.com/mart-anthony-stark/Unnamed.js#response-methods)
- [Modular Routing](https://github.com/mart-anthony-stark/Unnamed.js#router-for-modular-code)
- [Combine Routers](https://github.com/mart-anthony-stark/Unnamed.js#combine-routers)
- [Setup Demo](https://github.com/mart-anthony-stark/Unnamed.js/tree/test-package/demoV2)

### Getting started

- Install the unnamed-js package using yarn or npm

```bash
npm i unnamed-js
```

- In your main script, call the unnamed function and assign it to a variable
  There are 2 ways to start the server, if you passed the options when calling the method, the server will automatically start.

```javascript
const unnamed = require("unnamed-js");

const server = unnamed({
  port: 3000,
  init: () => {
    // This will run as the server initializes
    console.log("App is running");
  },
});
```

or you can start the server manually
 
```javascript
const server = unnamed();
const PORT = 3000;
server.startServer(PORT, callback);
```

![server](https://github.com/mart-anthony-stark/Unnamed.js/blob/test/docs/start%20server.png?raw=true)

### Middlewares

- Middleware functions are methods that have access to the request object and the response object.

```javascript
server.middleware(cors("*"));
```

```javascript
server.middleware((request, response) => {
  request.user = user;
});
```

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

In the main script, you can use directly the http methods by destructuring the server object

```javascript
const { GET, POST, PUT, PATCH, DELETE } = server;
GET("/", (req, res) => {
  res.send("Hello");
});
```

### Request object

- query - endpoint queries can be accessed through request.query object

  - Sample endpoint: http://localhost:3000/user?name=mart&age=19

```javascript
GET("/user", (request, response) => {
  res.send({
    username: request.query.name,
    age: request.query.age,
  });
});
```

- params - Params object contains parameter values parsed from the URL path

  - Sample endpoint: http://localhost:3000/user/123456

```javascript
GET("/user/:id", (request, response) => {
  res.send({
    userId: request.params.id,
  });
});
```

- body - The read-only body property of the Request interface contains a ReadableStream with the body contents that have been added to the request.

```javascript
POST("/post", async (request, response) => {
  const post = await new Post(request.body).save();
  response.send(post);
});
```

> Note: Unnamed.js has a built-in body parser that listens to data event and attaches to request object. You don't need to install external library such as body parser.

### Response methods

- code() - This method sets the response status code. If you want to know more about HTTP status codes, visit [MDN Web Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
  - Syntax:
  ```typescript
  const status: number = 200;
  response.code(status);
  ```
- send() - This method basically sends the HTTP response. The body parameter can be a String or a Buffer object or an object or an Array. It accepts a single parameter body that describe the body which is to be sent in the response. It also automatically parse the body into JSON if possible.
  - Syntax:
  ```javascript
  const body = {
    id: 123456,
    name: Mart Anthony Salazar,
    age: 19
  }
  response.send(body)
  ```
- You can also render html using HTML String

```javascript
response.send(`<input type="text" name="username" placeholder="Username" />`);
```

> HTML input tag rendered in unnamed-js response.send reduces the vulnerability in reflected xss attacks (tested using xsstrike)

- goto() - This method redirects the to the URL derived from the specified path.

### Router for modular code

The server object comes up with a router() method to include routes from another javascript file.

- This takes a parameter of array of objects
- For example, you have two routers: auth and users

```javascript
// app.js
server.router(require("./routes"));
```

```javascript
// routes/index.js
const routes = [
  {
    prefix: "users",
    router: require("./user.route"),
  },
  {
    prefix: "auth",
    router: require("./auth.route"),
  },
];

module.exports = routes;
```

- For the users route:

```javascript
const userRoute = ({ GET, POST, PUT, PATCH, DELETE }) => {};
```
