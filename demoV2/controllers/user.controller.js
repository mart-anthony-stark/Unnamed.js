const User = require("../models/User.model");

module.exports = {
  getAllUsers: async (req, res) => {
    const users = await User.find();
    res.send(users);
  },
};
