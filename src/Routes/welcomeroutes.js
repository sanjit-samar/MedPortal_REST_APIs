const express = require("express");
const Router = express.Router();
const adminMiddleware = require("../Middleware/admin-middleware");
const authmiddleware = require("../Middleware/auth-middleware");

Router.get("/welcome", authmiddleware,adminMiddleware, (req, res) => {
  const { username, role, userid } = req.userInfo;

  res.json({
    message: "Welcome Home page",
    user: {
      _id: userid,
      username,
      role,
    },
  });
});

module.exports = Router;
