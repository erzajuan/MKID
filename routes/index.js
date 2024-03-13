const route = require("express").Router();

route.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome",
  });
});

const userRoute = require("./user_route");

route.use("/api/users", userRoute);
route.get('/test', (req, res) => {
  res.status(200).json({
    message: "test route",
  });
})

module.exports = route;
