const userModel = require("../models/user.model");

async function getUsersController(req, res) {
  const user = req.user;

  try {
    const userRecords = await userModel.find().select("-password");
    return res.status(200).json({
      message: "Users fetched successfully",
      users: userRecords,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function registerUserController(req, res) {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      message: "Email, password, and name are required",
    });
  }

  try {
    const isExists = await userModel.findOne({
      email: email,
    });

    if (isExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await userModel.create({
      email,
      password,
      name,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function deleteUserController(req, res) {
  const userId = req.params.id;

  try {
    await userModel.deleteOne({
      _id: userId,
    });
    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function updateUserController(req, res) {
  const userId = req.params.id;
  let { email, name } = req.body;

  if (!email || !name) {
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!email) email = existingUser.email;
    if (!name) name = existingUser.name;
  }

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: userId },
      { email, name },
      {returnDocument: "after"}
    );
    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  getUsersController,
  registerUserController,
  deleteUserController,
  updateUserController,
};
