const store = require("./Store");

const addRoute = (method, prefix, url, ...rest) => {
  if (rest.length < 2 && typeof rest[0] !== "function")
    throw new Error("varArgs : no callbacks specified");

  store.insertRoute(
    method,
    `${prefix ? "/" + prefix + url : url + "/"}`,
    rest.length === 2 ? rest[0] : null,
    rest.length === 1 ? rest[0] : rest[1]
  );
};

const registerRouter = (routerOpts) => {
  const prefix = routerOpts.prefix;
  const route = {
    GET: (url, ...rest) => {
      addRoute("get", prefix, url, ...rest);
    },
    POST: (url, ...rest) => {
      addRoute("post", prefix, url, ...rest);
    },
    PUT: (url, ...rest) => {
      addRoute("put", prefix, url, ...rest);
    },
    PATCH: (url, ...rest) => {
      addRoute("patch", prefix, url, ...rest);
    },
    DELETE: (url, ...rest) => {
      addRoute("delete", prefix, url, ...rest);
    },
  };

  routerOpts.router(route);
};

/**
 * Register an array of routers for modular code.
 * Accepts an array of routers
 */
const combineRouters = (routers) => {
  routers.forEach((router) => {
    registerRouter(router);
  });
};

module.exports = {
  registerRouter,
  combineRouters,
};
