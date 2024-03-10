const userRoute = require("express").Router();
const { userController } = require("../controllers");
const { multerRegister } = require("../services/multer");

userRoute.get("/", userController.getUsers);

userRoute.post("/auth/register/", multerRegister, userController.register);

module.exports = userRoute;
