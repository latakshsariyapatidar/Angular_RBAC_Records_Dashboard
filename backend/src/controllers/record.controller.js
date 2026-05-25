const userModel = require("../models/user.model");
const recordModel = require("../models/record.model");
const jwt = require("jsonwebtoken");

async function getRecords(isAdmin, userId) {
  if (isAdmin) {
    return await recordModel.find().populate("userId", "email name");
  } else {
    return await recordModel
      .find({ userId: userId })
      .populate("userId", "email name");
  }
}

async function getRecordsController(req, res) {
  try {
    const user = req.user;
    const isAdmin = user.role === "Admin";

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const records = await getRecords(isAdmin, user._id);
    return res.status(200).json({
      message: "Records fetched successfully",
      records: records,
    });
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}


module.exports = {
  getRecordsController,
};

