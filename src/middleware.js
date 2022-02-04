async function handleMiddlewares(middlewares, req, res, callback) {
  let index = 0;

  middlewares.forEach(async (fn) => {
    await fn(req, res);
  });

  //   const next = (err) => {
  //     if (err != null) {
  //       return setImmediate(() => callback(err));
  //     }
  //     if (index >= middlewares.length) {
  //       return setImmediate(() => callback());
  //     }

  //     const layer = middlewares[index++];
  //     setImmediate(() => {
  //       try {
  //         layer(req, res, next);
  //       } catch (error) {
  //         next(error);
  //       }
  //     });
  //   };
  //   next();
}

module.exports = handleMiddlewares;
