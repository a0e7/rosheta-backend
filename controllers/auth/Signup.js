const User = require("../../models/user");
const Patient = require("../../models/patient");
const Role = require("../../models/roles");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res, next) => {
  let patienRole = await Role.findOne({ name: "patient" }); // Changed to let from const
  if (!patienRole) {
    const newRole = new Role({ name: "patient" });
    await newRole.save();
    patienRole = newRole;
  }

  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  const role = patienRole;
  const firstName = req.body.firstName;
  const middleName = req.body.middleName;
  const lastName = req.body.lastName;
  const dateOfBirth = req.body.dateOfBirth;
  const residenceCity = req.body.residenceCity;
  try {
    const user = User.findOne({ phoneNumber: phoneNumber });
    if (user) {
      res.status(409).json({ message: "there is a user with this number" });
    }
    const hashedpw = await bcrypt.hash(password, 12);
    const newuser = new User({
      phoneNumber: phoneNumber,
      password: hashedpw,
      role: role,
    });
    newuser.save();

    const patient = new Patient({
      user_ID: user._id,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      dateOfBirth: new Date(dateOfBirth),
      residenceCity: residenceCity,
    });
    patient.save();

    res.status(201).json({ message: "User Added", userId: user._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
