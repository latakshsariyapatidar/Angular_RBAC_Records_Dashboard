const express = require("express");

const authController = require("../controllers/auth.controller");

const Router = express.Router();

/**
 * POST /api/auth/register
 */
Router.post("/register", authController.userRegisterController);


module.exports = Router;
