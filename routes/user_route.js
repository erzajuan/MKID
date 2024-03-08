const userRoute = require("express").Router();
const { userController } = require("../controllers");

userRoute.get("/", userController.getUsers);

module.exports = userRoute;
