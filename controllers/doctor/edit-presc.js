const fs = require("fs");
const { validationResult } = require("express-validator");
const path = require("path");
const Prescription = require("../../models/prescription");
const User = require("../../models/user");
const patient = require("../../models/patient");

exports.updatePresciption = async (req, res, next) => {
  const prescriptionId = req.body.prescriptionId;
  const patientNumber = req.body.patientNumber;
  const prescriptionDetails = req.body.prescriptionDetails;

  if (!patientNumber || !prescriptionDetails) {
    const error = new Error("All fields are required.");
    error.statusCode = 422;
    return next(error);
  }

  try {
    // Check if the new phone number exists in the User table
    const user = await User.findOne({ phoneNumber: patientNumber });

    // Find the prescription to update
    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    // Update fields
    prescription.patient = user ? user._id : null; // Update patient reference if a user exists
    prescription.patientNumber = patientNumber; // Always store the updated phone number
    prescription.prescriptionDetails = Array.isArray(prescriptionDetails)
      ? prescriptionDetails
      : [prescriptionDetails];

    // Save the updated prescription
    await prescription.save();

    res.status(200).json({
      message: "Prescription Updated",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
