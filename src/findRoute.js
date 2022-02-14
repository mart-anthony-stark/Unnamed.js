const findRoute = (routes, method, url) => {
  // delete extra slash to end of the entered url
  if (url.substring(url.length - 1) === "/" && url.length !== 1) {
    url = url.slice(0, url.length - 1);
  }
  const route = routes.find((route) => {
    return route.method === method && route.url.match(url);
  });

  if (!route) return null;
  return { handler: route.handler, params: route.url.match(url) };
};

module.exports = findRoute;
