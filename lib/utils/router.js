const store = require("./Store");

const registerRouter = (routerOpts) => {
  const prefix = routerOpts.prefix;
  const route = {
    GET: (url, ...rest) => {
      if (rest.length < 2 && typeof rest[0] !== "function")
        throw new Error("varArgs : no callbacks specified");

      store.insertRoute(
        "get",
        `${prefix ? "/" + prefix + url : url + "/"}`,
        rest.length === 2 ? rest[0] : null,
        rest.length === 1 ? rest[0] : rest[1]
      );
    },
    POST: (url, ...rest) => {
      if (rest.length < 2 && typeof rest[0] !== "function")
        throw new Error("varArgs : no callbacks specified");

      store.insertRoute(
        "post",
        `${prefix ? "/" + prefix + url : url + "/"}`,
        rest.length === 2 ? rest[0] : null,
        rest.length === 1 ? rest[0] : rest[1]
      );
    },
    PUT: (url, ...rest) => {
      if (rest.length < 2 && typeof rest[0] !== "function")
        throw new Error("varArgs : no callbacks specified");

      store.insertRoute(
        "put",
        `${prefix ? "/" + prefix + url : url + "/"}`,
        rest.length === 2 ? rest[0] : null,
        rest.length === 1 ? rest[0] : rest[1]
      );
    },
    PATCH: (url, ...rest) => {
      if (rest.length < 2 && typeof rest[0] !== "function")
        throw new Error("varArgs : no callbacks specified");

      store.insertRoute(
        "patch",
        `${prefix ? "/" + prefix + url : url + "/"}`,
        rest.length === 2 ? rest[0] : null,
        rest.length === 1 ? rest[0] : rest[1]
      );
    },
    DELETE: (url, ...rest) => {
      if (rest.length < 2 && typeof rest[0] !== "function")
        throw new Error("varArgs : no callbacks specified");

      store.insertRoute(
        "delete",
        `${prefix ? "/" + prefix + url : url + "/"}`,
        rest.length === 2 ? rest[0] : null,
        rest.length === 1 ? rest[0] : rest[1]
      );
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
