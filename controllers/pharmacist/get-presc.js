const fs = require("fs");
const { validationResult } = require("express-validator");
const path = require("path");
const Prescription = require("../../models/prescription");
const User = require("../../models/user");

exports.getPrescriptions = async (req, res, next) => {
  const pharmacyId = req.body.pharmacyId;

  try {
    const prescriptions = await Prescription.find({ pharmacy: pharmacyId });

    if (!prescriptions || prescriptions.length === 0) {
      return res
        .status(404)
        .json({ message: "No prescriptions found for this pharamcy." });
    }
    res.status(200).json({ message: "Fetched", prescriptions: prescriptions });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPrescription = async (req, res, next) => {
  const prescriptionId = req.params.prescriptionId;
  try {
    const prescription = await Prescription.findById(prescriptionId);
    if (!prescription) {
      return res.status(404).json({ message: "No prescriptions" });
    }

    res
      .status(200)
      .json({ message: "Prescription fetched", prescription: prescription });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
