/**
 *
 * @param {*} fn
 * @returns {Promise}
 * Automatically handles and catches
 */
const catcher = (fn, cb) => (req, res) => {
  Promise.resolve(fn(req, res)).catch((err) => {
    if (cb) {
      cb(req, res);
      return;
    }
    res.code(500).send({ msg: err.message });
  });
};

module.exports = {
  catcher,
};
