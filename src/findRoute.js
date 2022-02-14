const Route = require("./route-parser");

const findRoute = (routes, method, url) => {
  const route = routes.find((route) => {
    return route.method === method && route.url.match(url);
  });

  if (!route) return null;
  return { handler: route.handler, params: route.url.match(url) };
};

module.exports = findRoute;

// if (rUrl.substring(rUrl.length - 1) === "/" && rUrl.length !== 1) {
//   rUrl = rUrl.slice(0, rUrl.length - 1);
// }
// if (url.substring(url.length - 1) === "/" && url.length !== 1) {
//   url = url.slice(0, url.length - 1);
// }
