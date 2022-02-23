const store = require("./Store");

const get = (route, options = {}, handler) =>
  store.insertRoute("get", route, handler, options);
const post = (route, options = {}, handler) =>
  store.insertRoute("post", route, handler, options);
const put = (route, options = {}, handler) =>
  store.insertRoute("put", route, handler, options);
const patch = (route, options = {}, handler) =>
  store.insertRoute("patch", route, handler, options);
const del = (route, options = {}, handler) =>
  store.insertRoute("delete", route, handler, options);

module.exports = { get, post, put, patch, del };
