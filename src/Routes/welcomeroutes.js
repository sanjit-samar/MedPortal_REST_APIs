const express = require("express");
const Router = express.Router();
const adminMiddleware = require("../Middleware/admin-middleware");
const authmiddleware = require("../Middleware/auth-middleware");
const {welcome} = require("../controllers/welcomeController");

Router.get("/welcome", authmiddleware,adminMiddleware, welcome);

module.exports = Router;
