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

  const app = (port) => {
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

    return {
      middleware,
      get,
      post,
      put,
      patch,
      delete: del,
    };
  };

  return app;
})();
