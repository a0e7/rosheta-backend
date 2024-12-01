const fs = require("fs");
const { validationResult } = require("express-validator");
const path = require("path");
const Pharmacy = require("../../models/pharmacist");
const User = require("../../models/user");

exports.deactivatePharmacy = async (req, res, next) => {
  const pharmacyId = req.params.pharmacyId;

  try {
    const pharmacy = await User.findById(pharmacyId);
    if (!pharmacy) {
      const error = new Error("Could not find Pharmacy");
      error.statusCode = 404;
      throw error;
    }

    // Deactivate the doctor account by setting isActive to false
    pharmacy.isActive = false;
    await pharmacy.save();

    res.status(200).json({ message: "Pharamcy account deactivated" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
