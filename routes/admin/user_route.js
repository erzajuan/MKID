const userRoute = require("express").Router();
const { adminUserController } = require("../../controllers");

userRoute.get("/", adminUserController.get);
userRoute.post("/", adminUserController.create);
userRoute.put("/:id", adminUserController.update);
userRoute.delete("/:id", adminUserController.delete);
userRoute.get("/:id", adminUserController.getById);

module.exports = userRoute;
