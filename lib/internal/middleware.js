async function handleMiddlewares(middlewares, req, res, callback) {
  let i = 0;
  const next = async () => {
    let fn = middlewares[i++];
    if (i <= middlewares.length) {
      await fn(req, res, next);
    }
  };
  next();
}

module.exports = handleMiddlewares;
