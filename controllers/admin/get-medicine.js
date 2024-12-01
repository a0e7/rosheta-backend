const fs = require("fs");
const { validationResult } = require("express-validator");
const path = require("path");
const Medicine = require("../../models/Medicine");
const User = require("../../models/user");

exports.getMedicines = async (req, res, next) => {
  try {
    const medicines = await Medicine.find();
    res.status(200).json({ message: "Fetched", medicines: medicines });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getMedicine = async (req, res, next) => {
  const medicineId = req.params.medicineId;
  try {
    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      const error = new Error("Medicine not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Medicine fetched", medicine: medicine });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
