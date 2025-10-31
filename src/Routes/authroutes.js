const express = require("express");
const Router = express.Router();
const {register} = require("../Controllers/authController");


Router.post("/register", register);
//Router.post("/login",);

module.exports = Router;