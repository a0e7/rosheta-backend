const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const mongoose = require("mongoose");

exports.resetPassword = async (req, res, next) => {
  const userId = new mongoose.Types.ObjectId(req.user.userId);
  const newPassword = req.body.newPassword;
  const oldPassword = req.body.oldPassword;
  try {
    const user = User.findById(userId);

    const isEqual = await bcrypt.compare(oldPassword, user.password);

    if (isEqual) {
      const hashedpw = await bcrypt.hash(newPassword, 12);
      user.password = hashedpw;
      res.status(200).json({ message: "Password Change Succesfully" });
    } else {
      res.status(400).json({ message: "Old Password doesn't match" });
    }
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
