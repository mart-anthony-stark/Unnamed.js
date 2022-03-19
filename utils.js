/**
 *
 * @param {*} fn
 * @returns {Promise}
 * Automatically handles and catches
 */
const catcher = (fn, cb) => (req, response) => {
  Promise.resolve(fn(req, response)).catch((err) => {
    if (cb) {
      cb(req, response);
      return;
    }
    response.code(400).send({ msg: err.message || err });
  });
};

module.exports = {
  catcher,
};
