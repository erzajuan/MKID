const userRoute = require("express").Router();
const { userController } = require("../controllers");
const { checkToken } = require("../services/auth");
const { multerRegister } = require("../services/multer");

userRoute.get("/", userController.getUsers);

userRoute.post("/auth/register/", multerRegister, userController.register);
userRoute.post("/auth/login/", userController.login);

userRoute.get("/auth/check", checkToken, userController.check)


module.exports = userRoute;
