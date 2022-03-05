const http = require("http");
const handleMiddlewares = require("./utils/middleware");
const findRoute = require("./utils/findRoute");
const bodyParser = require("./utils/bodyParser");
const queryParser = require("./query-parser");
const response = require("./utils/response");
const { combineRouters, registerRouter } = require("./utils/router");
const { GET, POST, PUT, PATCH, DELETE } = require("./http-methods");
const store = require("./utils/Store");

const isHTML = (str) => {
  let a = document.createElement("div");
  a.innerHTML = str;

  for (let c = a.childNodes, i = c.length; i--; ) {
    if (c[i].nodeType == 1) return true;
  }

  return false;
};

const stringToHTML = (str) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, "text/html");
  return doc.body;
};

module.exports = (() => {
  const app = (options, log = true) => {
    const startServer = async (port, cb) => {
      if (!port) throw new Error("Error: port is not defined");
      http
        .createServer(async (req, res) => {
          await bodyParser(req);

          // Handling middlewares
          await handleMiddlewares(req, res, (err) => {
            if (err) {
              res.writeHead(500);
              res.end("Something went wrong");
            }
          });

          // Handling routes
          const method = req.method.toLowerCase();
          let url = req.url.toLowerCase();
          if (url.includes("?")) {
            const path = url.split("?");
            url = path[0];
            req.query = queryParser(path[1]);
          }
          const route = findRoute(store.routes, method, url);
          if (route) {
            req.params = route.params;
            response(res);
            return route.handler(req, res);
          }
          res.writeHead(404, {
            "Content-Type": "text/plain",
          });
          res.end(
            JSON.stringify({
              url: req.url,
              method: req.method,
              msg: "Route not found",
              statusCode: 404,
            })
          );
          return;
        })
        .listen(port, (e) => {
          if (e) return console.log(e);
          if (log) {
            console.log(`${new Date().toUTCString()}`);
            console.log(`Server started running at port ${port}`);
          }
          cb && cb(e);
        });
    };

    if (options && options.port) {
      startServer(options.port, options.init);
    }

    return {
      middleware: store.insertMiddleware,
      GET,
      POST,
      PUT,
      PATCH,
      DELETE,
      startServer,
      registerRouter,
      combineRouters,
    };
  };

  return app;
})();
