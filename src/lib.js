const http = require("http");

module.exports = (() => {
  let routes = [];
  let middlewares = [];

  const insertRoute = (method, url, handler, options) =>
    routes.push({ url, method, handler, options });

  const findRoute = (method, url) => {
    return routes.find(
      (route) =>
        route.url.toLowerCase() == url.toLowerCase() &&
        route.method.toLowerCase() &&
        method.toLowerCase()
    );
  };

  const app = (port, serverInit) => {
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
        .createServer((req, res) => {
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
        })
        .listen(port, (e) => {
          if (e) return console.log(e);
          console.log(`${new Date().toUTCString()}`);
          console.log(`Server started running at port ${port}`);
          cb && cb();
        });
    };

    if (port) {
      listen(port, serverInit);
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
