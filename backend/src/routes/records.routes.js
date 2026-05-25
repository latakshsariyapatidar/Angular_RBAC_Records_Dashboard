const authMiddleware = require('../middlewares/auth.middleware');
const recordsController = require('../controllers/record.controller');
const delayMiddleware = require('../middlewares/delay.middleware');
const express = require("express");


const router = express.Router();


router.get("/", authMiddleware.authMiddleware, delayMiddleware.delayController,recordsController.getRecordsController);

module.exports = router;