require("dotenv").config();

const User = require("../../models/user");

const Role = require("../../models/roles");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.adminCreate = async (req, res, next) => {
  let adminRole = await Role.findOne({ name: "admin" }); // Changed to let from const
  if (!adminRole) {
    const newRole = new Role({ name: "admin" });
    await newRole.save();
    adminRole = newRole;
  }
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  try {
    const hashedpw = await bcrypt.hash(password, 12);
    const user = new User({
      phoneNumber: phoneNumber,
      password: hashedpw,
      role: adminRole,
    });
    user.save();
  } catch (err) {
    if (!err.statusCode) {
      console.error("admin create error:", err);
      res
        .status(500)
        .json({ message: "An error occurred during creating admin" });
    }
    next(err);
  }
};
