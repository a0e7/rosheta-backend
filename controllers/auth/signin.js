require("dotenv").config();

const User = require("../../models/user");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  try {
    const user = await User.findOne({ phoneNumber: phoneNumber });
    if (!user) {
      return res.status(401).json({ message: "No such user found" });
    }
    if (!user.isActive) {
      const error = new Error("User not active");
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = jwt.sign(
      {
        phoneNumber: user.phoneNumber,
        userId: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET,

      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      userId: user._id.toString(),
      role: user.role,
    });
  } catch (err) {
    if (!err.statusCode) {
      console.error("Login error:", err);
      res.status(500).json({ message: "An error occurred during login" });
    }
    next(err);
  }
};
