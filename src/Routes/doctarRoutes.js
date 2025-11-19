const express = require("express");
const Router = express.Router();
const authmiddleware = require("../Middleware/auth-middleware");
const doctarMiddleware = require("../Middleware/doctar-middleware");
const {createAppointment} = require("../controllers/doctarController");

Router.post("/patient", authmiddleware, doctarMiddleware, createAppointment);

module.exports = Router;