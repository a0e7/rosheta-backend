const fs = require("fs");
const { validationResult } = require("express-validator");
const path = require("path");
const Pharmacy = require("../../models/pharmacist");
const User = require("../../models/user");

exports.updatePharmacy = async (req, res, next) => {
  const pharmacyId = "674a1d03ff5abc35a47ba998";
  const phoneNumber = req.body.phoneNumber;
  const pharmacyName = req.body.pharmacyName;
  const pharmacyLocation = req.body.pharmacyLocation;
  const pharmacyPhoneNumber = req.body.pharmacyPhoneNumber;
  const pharmacyEmployee = req.body.pharmacyEmployee;
  const pharmacyEmployeeNumber = req.body.pharmacyEmployeeNumber;

  if (
    !pharmacyPhoneNumber ||
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
    const user = await User.findById(pharmacyId);
    if (!user) {
      const error = new Error("Could not find Pharmacy");
      error.statusCode = 404;
      throw error;
    }

    user.phoneNumber = phoneNumber;
    await user.save();

    const pharmacy = await Pharmacy.findOne({ user_ID: user._id });

    if (!pharmacy) {
      const error = new Error("Could not find the pharmacy details");
      error.statusCode = 404;
      throw error;
    }

    pharmacy.pharmacyName = pharmacyName;
    pharmacy.pharmacyLocation = pharmacyLocation;
    pharmacy.pharmacyPhoneNumber = pharmacyPhoneNumber;
    pharmacy.pharmacyEmployee = pharmacyEmployee;
    pharmacy.pharmacyEmployeeNumber = pharmacyEmployeeNumber;

    const result = await pharmacy.save();
    res.status(200).json({ message: "Pharmacy updated", pharamacy: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
