const Route = require("../route-parser");

class Store {
  constructor() {
    if (Store.instance == null) {
      this.routes = [];
      this.middlewares = [];
      Store.instance = this;
    }
    return Store.instance;
  }

  insertRoute = (method, url, options, handler) => {
    // DELETES EXTRA SLASH IN THE TAIL OF THE PATH
    if (url.substring(url.length - 1) === "/" && url.length !== 1)
      url = url = url.slice(0, url.length - 1);

    if (typeof handler == "function")
      this.routes.push({ url: new Route(url), method, handler, options });
    else
      this.routes.push({
        url: new Route(url),
        method,
        options: handler,
        handler: options,
      });
  };

  insertMiddleware = (middlewareHandler) => {
    if (typeof middlewareHandler == "function")
      this.middlewares.push(middlewareHandler);
  };
}

const store = new Store();
Object.freeze(store);
module.exports = store;
