const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.route('/register')
  .post(userController.registerUser);

userRouter.route('/login')
  .post(userController.loginUser);

userRouter.route('/logout')
  .get(userController.logoutUser);

userRouter.route('/byid/:id')
  .get(userController.getUserById);

userRouter.route('/byusername/:username')
  .get(userController.getUserByName);

module.exports = userRouter;
