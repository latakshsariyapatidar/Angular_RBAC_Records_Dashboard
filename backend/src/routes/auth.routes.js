const express = require("express");

const authController = require("../controllers/auth.controller");

const Router = express.Router();

/**
 * POST /api/auth/register
 */
Router.post("/register", authController.userRegisterController);

/**
 * POST /api/auth/login
 */
Router.post("/login", authController.userLoginController);

/** 
 * GET /api/auth/logout
 */
Router.post("/logout", authController.userLogoutController);

module.exports = Router;
