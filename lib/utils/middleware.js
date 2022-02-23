const store = require("./Store");

async function handleMiddlewares(req, res, callback) {
  let i = 0;
  const next = async () => {
    let fn = store.middlewares[i++];
    if (i <= store.middlewares.length) {
      await fn(req, res, next);
    }
  };
  next();
}

module.exports = handleMiddlewares;
