const http = require("http");
const handleMiddlewares = require("./middleware");
const findRoute = require("./findRoute");
const bodyParser = require("./bodyParser");
const Route = require("./route-parser");
const queryParser = require("./query-parser");

module.exports = (() => {
  let routes = [];
  let middlewares = [];

  const insertRoute = (method, url, options, handler) => {
    // DELETES EXTRA SLASH IN THE TAIL OF THE PATH
    if (url.substring(url.length - 1) === "/" && url.length !== 1)
      url = url = url.slice(0, url.length - 1);

    routes.push({ url: new Route(url), method, handler, options });
  };

  const app = (options) => {
    const middleware = (middlewareHandler) => {
      if (typeof middleware == "function") middlewares.push(middlewareHandler);
    };

    const get = (route, options = {}, handler) =>
      insertRoute("get", route, handler, options);
    const post = (route, options = {}, handler) =>
      insertRoute("post", route, handler, options);
    const put = (route, options = {}, handler) =>
      insertRoute("put", route, handler, options);
    const patch = (route, options = {}, handler) =>
      insertRoute("patch", route, handler, options);
    const del = (route, options = {}, handler) =>
      insertRoute("delete", route, handler, options);

    // Custom Router
    const registerRouter = (routerOpts) => {
      const prefix = routerOpts.prefix;
      const route = {
        get: (url, ...rest) => {
          if (rest.length < 2 && typeof rest[0] !== "function")
            throw new Error("varArgs : no callbacks specified");

          insertRoute(
            "get",
            `${prefix ? "/" + prefix + url : url + "/"}`,
            rest.length === 2 ? rest[0] : null,
            rest.length === 1 ? rest[0] : rest[1]
          );
        },
        post: (url, ...rest) => {
          if (rest.length < 2 && typeof rest[0] !== "function")
            throw new Error("varArgs : no callbacks specified");

          insertRoute(
            "post",
            `${prefix ? "/" + prefix + url : url + "/"}`,
            rest.length === 2 ? rest[0] : null,
            rest.length === 1 ? rest[0] : rest[1]
          );
        },
        put: (url, ...rest) => {
          if (rest.length < 2 && typeof rest[0] !== "function")
            throw new Error("varArgs : no callbacks specified");

          insertRoute(
            "put",
            `${prefix ? "/" + prefix + url : url + "/"}`,
            rest.length === 2 ? rest[0] : null,
            rest.length === 1 ? rest[0] : rest[1]
          );
        },
        patch: (url, ...rest) => {
          if (rest.length < 2 && typeof rest[0] !== "function")
            throw new Error("varArgs : no callbacks specified");

          insertRoute(
            "patch",
            `${prefix ? "/" + prefix + url : url + "/"}`,
            rest.length === 2 ? rest[0] : null,
            rest.length === 1 ? rest[0] : rest[1]
          );
        },
        delete: (url, ...rest) => {
          if (rest.length < 2 && typeof rest[0] !== "function")
            throw new Error("varArgs : no callbacks specified");

          insertRoute(
            "delete",
            `${prefix ? "/" + prefix + url : url + "/"}`,
            rest.length === 2 ? rest[0] : null,
            rest.length === 1 ? rest[0] : rest[1]
          );
        },
      };

      routerOpts.router(route);
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
          const route = findRoute(routes, method, url);
          if (route) {
            let status = 200;
            req.params = route.params;
            res.code = (statusCode) => {
              status = statusCode;
              return res;
            };
            res.send = (ctx) => {
              try {
                //   Auto converts to JSON if possible
                ctx = JSON.stringify(ctx);
                res.writeHead(status, {
                  "Content-Type": "application/json",
                });
              } catch (error) {
                res.writeHead(status, {
                  "Content-Type": "text/plain",
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
    };
  };

  return app;
})();
