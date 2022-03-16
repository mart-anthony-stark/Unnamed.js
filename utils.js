/**
 *
 * @param {*} fn
 * @returns {Promise}
 * Automatically handles and catches
 */
const catcher = (fn, cb) => (req, reply) => {
  Promise.resolve(fn(req, reply)).catch((err) => {
    if (cb) {
      cb(req, reply);
      return;
    }
    reply.code(500).send({ msg: err.message });
  });
};

module.exports = {
  catcher,
};
