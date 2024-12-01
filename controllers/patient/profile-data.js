const fs = require("fs");
const { validationResult } = require("express-validator");
const path = require("path");
const Patient = require("../../models/patient");
const User = require("../../models/user");

exports.getPatient = async (req, res, next) => {
  const patientId = req.params.patientId;
  try {
    const user = await User.findById(patientId);
    if (!user) {
      const error = new Error("Could not find Doctor");
      error.statusCode = 404;
      throw error;
    }
    const patient = await Patient.findOne({ user_ID: patientId });
    res.status(200).json({ message: "Doctor fetched", patient: patient });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
