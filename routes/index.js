const route = require("express").Router();

route.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome",
  });
});

const userRoute = require("./user_route");

route.use("/api/users", userRoute);


// ==== Admin Route ====
const adminUserRoute = require("./admin/user_route");

route.use("/api/admin/user", adminUserRoute);

module.exports = route;
