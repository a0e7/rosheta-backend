const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const mongoose = require("mongoose");

exports.forgetPassword = async (req, res, next) => {
  const phoneNumber = req.body.phoneNumber;
  const newPassword = req.body.newPassword;
  try {
    const user = await User.findOne({ phoneNumber });
    const hashedpw = await bcrypt.hash(newPassword, 12);
    user.password = hashedpw;
    res.status(200).json({ message: "Password Change Succesfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
