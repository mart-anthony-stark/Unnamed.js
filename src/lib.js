const http = require("http");

module.exports = (() => {
  let routes = [];
  let middlewares = [];

  const insertRoute = (method, url, options, handler) =>
    routes.push({ url, method, handler, options });

  const findRoute = (method, url) => {
    return routes.find(
      (route) =>
        route.url.toLowerCase() === url.toLowerCase() &&
        route.method.toLowerCase() === method.toLowerCase()
    );
  };

  async function bodyParser(req) {
    //   Listening to data event and attatch to req.body
    return new Promise((resolve, reject) => {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        if (body !== "") {
          req.body = JSON.parse(body);
          resolve();
        } else resolve();
      });
    });
  }

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

    const listen = (port, cb) => {
      http
        .createServer(async (req, res) => {
          await bodyParser(req);

          // Handling middlewares
          handleMiddlewares(req, res, (err) => {
            if (err) {
              res.writeHead(500);
              res.end("Something went wrong");
            }
          });

          function handleMiddlewares(req, res, callback) {
            let index = 0;

            const next = (err) => {
              if (err != null) {
                return setImmediate(() => callback(err));
              }
              if (index >= middlewares.length) {
                return setImmediate(() => callback());
              }

              const layer = middlewares[index++];
              setImmediate(() => {
                try {
                  layer(req, res, next);
                } catch (error) {
                  next(error);
                }
              });
            };
            next();
          }

          // Handling routes
          const route = findRoute(req.method, req.url);
          if (route) {
            let status = 200;
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
      get,
      post,
      put,
      patch,
      delete: del,
      listen,
    };
  };

  return app;
})();
