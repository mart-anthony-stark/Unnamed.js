const http = require("http");
const handleMiddlewares = require("./utils/middleware");
const findRoute = require("./utils/findRoute");
const bodyParser = require("./utils/bodyParser");
const queryParser = require("./query-parser");
const response = require("./utils/response");
const { combineRouters } = require("./utils/router");
const { GET, POST, PUT, PATCH, DELETE } = require("../http-methods");
const store = require("./utils/Store");

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

          response(res); // binds extra methods to response object

          if (route) {
            req.params = route.params;
            const options = route.options;

            const handleGuards = async () => {
              //Handle route guards
              options.beforeEnter.push(route.handler);
              // options.beforeEnter.forEach(async (guard) => {
              //   await guard(req, res);
              // });
              let p = Promise.resolve();
              options.beforeEnter.forEach(async (guard) => {
                p = p.then(() => guard(req, res));
              });
              return p;
            };

            if (options) {
              if (!!options.beforeEnter) {
                handleGuards();
              }
            } else route.handler(req, res);

            return;
          }
          res.code(404).send({
            url: req.url,
            method: req.method,
            msg: "Route not found",
            statusCode: 404,
          });
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
      router: combineRouters,
    };
  };

  return app;
})();
