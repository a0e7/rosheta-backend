const fs = require("fs");
const { validationResult } = require("express-validator");
const path = require("path");
const Pharmacy = require("../../models/pharmacist");
const User = require("../../models/user");

exports.getPharmacies = async (req, res, next) => {
  try {
    const pharamacies = await Pharmacy.find();
    res.status(200).json({ message: "Fetched", pharamacies: pharamacies });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPharmacy = async (req, res, next) => {
  const pharmacyId = req.params.pharmacyId;
  try {
    const user = await User.findById(pharmacyId).select("-password");
    if (!user) {
      const error = new Error("Could not find Pharmacy");
      error.statusCode = 404;
      throw error;
    }
    const pharamacy = await Pharmacy.findOne({ user_ID: pharmacyId });
    res
      .status(200)
      .json({ message: "Pharmacy fetched", user: user, pharamacy: pharamacy });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
