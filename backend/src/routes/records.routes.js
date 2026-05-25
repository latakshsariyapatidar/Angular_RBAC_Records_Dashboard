const authMiddleware = require('../middlewares/auth.middleware');
const recordsController = require('../controllers/record.controller');
const express = require("express");


const router = express.Router();


router.get("/", authMiddleware.authMiddleware, recordsController.getRecordsController);

module.exports = router;