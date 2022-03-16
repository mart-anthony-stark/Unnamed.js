/**
 *
 * @param {*} fn
 * @returns {Promise}
 * Automatically handles and catches
 */
const catcher = (fn, cb) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (cb) {
      cb();
      return;
    }
    res.code(500).send({ msg: err.message });
  });
};

module.exports = {
  catcher,
};
