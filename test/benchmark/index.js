var apiBenchmark = require("api-benchmark");

var service = {
  server1: "http://localhost:3000/user",
};

var routes = {
  route1: "route1",
  route2: "route2",
  route3: {
    method: "post",
    route: "/user",
    data: {
      test: true,
      moreData: "aString",
    },
  },
};

apiBenchmark.measure(service, routes, function (err, results) {
  console.log({ stats: results.server1.route1 });
  console.log({ stats: results.server1.route2 });
  console.log({ stats: results.server1.route3 });
});
