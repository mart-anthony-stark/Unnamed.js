const http = require("http");
const handleMiddlewares = require("./utils/middleware");
const findRoute = require("./utils/findRoute");
const bodyParser = require("./utils/bodyParser");
const queryParser = require("./query-parser");
const { combineRouters, registerRouter } = require("./utils/router");
const store = require("./utils/Store");

module.exports = (() => {
  let middlewares = [];

  const app = (options) => {
    const middleware = (middlewareHandler) => {
      if (typeof middleware == "function") middlewares.push(middlewareHandler);
    };

    const listen = async (port, cb) => {
      http
        .createServer(async (req, res) => {
          await bodyParser(req);

          // Handling middlewares
          await handleMiddlewares(middlewares, req, res, (err) => {
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
            let status = 200;
            req.params = route.params;
            res.code = (statusCode) => {
              status = statusCode;
              return res;
            };
            res.send = (ctx, contentType) => {
              try {
                //   Auto converts to JSON if possible
                ctx = JSON.stringify(ctx);
                res.writeHead(status, {
                  "Content-Type": "application/json",
                });
              } catch (error) {
                res.writeHead(status, {
                  "Content-Type": contentType || "text/plain",
                });
              }
              res.end(ctx);
            };

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
          console.log(`${new Date().toUTCString()}`);
          console.log(`Server started running at port ${port}`);
          cb && cb(e);
        });
    };

    if (options.port) {
      listen(options.port, options.init);
    }

    return {
      middleware,
      GET: get,
      POST: post,
      PUT: put,
      PATCH: patch,
      DELETE: del,
      listen,
      registerRouter,
      combineRouters,
    };
  };

  return app;
})();
