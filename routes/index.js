const route = require("express").Router();

route.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome",
  });
});

const keyboardRoute = require("./keyboard_route");
const userRoute = require("./user_route");

route.use("/api/users", userRoute);
route.use("/api/keyboards", keyboardRoute)
route.get('/test', (req, res) => {
  res.status(200).json({
    message: "test route",
  });
})

module.exports = route;
