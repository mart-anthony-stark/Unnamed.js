/**
 *
 * @param {*} options
 * @param {*} route
 * @param {*} req
 * @param {*} res
 * @returns Promise
 * Handles the execution of array of route guards
 */
exports.handleGuards = async (options, route, req, res) => {
  //Handle route guards
  options.beforeEnter.push(route.handler);
  let p = Promise.resolve();
  options.beforeEnter.forEach(async (guard) => {
    p = p.then(() => guard(req, res));
  });
  return p;
};

exports.handleBannedKeys = async (options, request) => {
  const banned = options.bannedKeys;

  if (Array.isArray(request.body)) {
    banned.forEach((key) => {
      request.body.forEach((entry) => {
        entry[key] = undefined;
      });
    });
  } else {
    banned.forEach((key) => {
      request.body[key] = undefined;
    });
  }
};
