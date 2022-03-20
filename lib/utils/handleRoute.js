exports.handleGuards = async (options, route, req,res) => {
  //Handle route guards
  options.beforeEnter.push(route.handler);
  let p = Promise.resolve();
  options.beforeEnter.forEach(async (guard) => {
    p = p.then(() => guard(req, res));
  });
  return p;
};
