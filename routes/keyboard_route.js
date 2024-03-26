const keyboardRoute = require("express").Router();
const { keyboardcontroller } = require("../controllers");
const { checkToken } = require("../services/auth");
const { multerUser } = require("../services/multer");

keyboardRoute.get("/", keyboardcontroller.getKeyboard);

module.exports = keyboardRoute;
