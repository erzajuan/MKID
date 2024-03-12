const userRoute = require("express").Router();
const { userController } = require("../controllers");
const { checkToken } = require("../services/auth");
const { multerUser } = require("../services/multer");

userRoute.get("/", userController.getUsers);

userRoute.post("/auth/register/", multerUser, userController.register);
userRoute.post("/auth/login/", userController.login);

userRoute.put("/auth/update/", checkToken, multerUser, userController.update);

//Check Token
userRoute.get("/auth/check", checkToken, userController.check);

module.exports = userRoute;
