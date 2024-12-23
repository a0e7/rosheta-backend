const Pharmacy = require("../../models/pharmacist");
const User = require("../../models/user");
const Role = require("../../models/roles");
const bcrypt = require("bcryptjs");

exports.postPharmacy = async (req, res, next) => {
  let pharamcyRole = await Role.findOne({ name: "pharmacy" });
  if (!pharamcyRole) {
    let newRole = new Role({ name: "pharmacy" });
    await newRole.save();
    pharamcyRole = newRole;
  }

  const password = req.body.password;
  const role = pharamcyRole;
  const pharmacyName = req.body.pharmacyName;
  const pharmacyLocation = req.body.pharmacyLocation;
  const phoneNumber = req.body.phoneNumber;
  const pharmacyEmployee = req.body.pharmacyEmployee;
  const pharmacyEmployeeNumber = req.body.pharmacyEmployeeNumber;

  if (
    !phoneNumber ||
    !password ||
    !pharmacyName ||
    !pharmacyLocation ||
    !pharmacyEmployee ||
    !pharmacyEmployeeNumber
  ) {
    const error = new Error("All fields are required");
    error.statusCode = 422;
    return next(error);
  }

  try {
    const existingUser = await User.findOne({
      phoneNumber: phoneNumber,
    });
    if (existingUser) {
      const error = new Error("Phone number already in use");
      error.statusCode = 422;
      return next(error);
    }

    const hashedpw = await bcrypt.hash(password, 12);
    const user = await new User({
      phoneNumber: phoneNumber,
      password: hashedpw,
      role: role,
    }).save();

    const pharmacy = await new Pharmacy({
      user_ID: user._id,
      pharmacyName: pharmacyName,
      pharmacyLocation: pharmacyLocation,
      phoneNumber: phoneNumber,
      pharmacyEmployee: pharmacyEmployee,
      pharmacyEmployeeNumber: pharmacyEmployeeNumber,
    }).save();

    res.status(201).json({
      message: "Pharmacy created",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
