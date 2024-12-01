const fs = require("fs");
const { validationResult } = require("express-validator");
const path = require("path");
const Doctor = require("../../models/doctor");
const User = require("../../models/user");

exports.getDoctor = async (req, res, next) => {
  const doctorId = "674a177a663b5df517a75f0d";
  try {
    const doctor = await Doctor.findOne({ user_ID: doctorId });
    if (!doctor) {
      const error = new Error("Could not find Doctor");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Doctor fetched", doctor: doctor });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
