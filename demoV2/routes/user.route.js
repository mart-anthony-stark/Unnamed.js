const userController = require("../controllers/user.controller");

const userRouter = (router) => {
  router.GET("/", userController.getAllUsers);
};

module.exports = userRouter;
