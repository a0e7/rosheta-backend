const fs = require("fs");
const { validationResult } = require("express-validator");
const path = require("path");
const Prescription = require("../../models/prescription");
const User = require("../../models/user");
const patient = require("../../models/patient");

exports.searchPresciption = async (req, res, next) => {
  try {
    const { query } = req.query; // Query from frontend (e.g., '12' for prescriptions starting with '12')

    // Search for prescriptions where the prescriptionId or other fields start with the query
    const prescriptions = await Prescription.find({
      prescriptionId: { $regex: `^${query}`, $options: "i" }, // Match beginning of prescriptionId
    }).limit(10); // Limit results to the first 10 prescriptions

    res.json(prescriptions); // Return matching prescriptions to the frontend
  } catch (err) {
    res.status(500).send("Error searching prescriptions");
  }
};
