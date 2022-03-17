const store = require("./lib/utils/Store");

const GET = (route, options = {}, handler) =>
  store.insertRoute("get", route, handler, options);
const POST = (route, options = {}, handler) =>
  store.insertRoute("post", route, handler, options);
const PUT = (route, options = {}, handler) =>
  store.insertRoute("put", route, handler, options);
const PATCH = (route, options = {}, handler) =>
  store.insertRoute("patch", route, handler, options);
const del = (route, options = {}, handler) =>
  store.insertRoute("delete", route, handler, options);

module.exports = { GET, POST, PUT, PATCH, DELETE: del };
