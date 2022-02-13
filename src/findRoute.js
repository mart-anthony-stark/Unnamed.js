const findRoute = (routes, method, url) => {
  return routes.find((route) => {
    let rUrl = route.url.toLowerCase();
    url = url.toLowerCase();
    if (rUrl.substring(rUrl.length - 1) === "/" && rUrl.length !== 1) {
      rUrl = rUrl.slice(0, rUrl.length - 1);
    }
    if (url.substring(url.length - 1) === "/" && url.length !== 1) {
      url = url.slice(0, url.length - 1);
    }
    console.log({ url, rUrl });
    return rUrl === url && route.method.toLowerCase() === method.toLowerCase();
  });
};

module.exports = findRoute;
