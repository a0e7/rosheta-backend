const fs = require("fs");
const { validationResult } = require("express-validator");
const path = require("path");
const Prescription = require("../../models/prescription");

exports.countPrescription = async (req, res, next) => {
  try {
    const doctorId = req.user.userId; // Assuming 'userId' is added to req.user in the middleware

    // Use aggregation to get the counts
    const [result] = await Prescription.aggregate([
      {
        $match: { doctor: doctorId }, // Filter prescriptions by doctorId
      },
      {
        $facet: {
          totalPrescriptions: [{ $count: "total" }], // Count all prescriptions
          dispensedPrescriptions: [
            { $match: { isDispensed: true } }, // Filter dispensed prescriptions
            { $count: "dispensed" }, // Count dispensed prescriptions
          ],
        },
      },
    ]);

    // If no result, set counts to 0
    const totalPrescriptions = result?.totalPrescriptions[0]?.total || 0;
    const dispensePrescriptions =
      result?.dispensedPrescriptions[0]?.dispensed || 0;

    res.status(200).json({
      message: "Prescription count fetched successfully",
      prescriptions: totalPrescriptions,
      dispensePrescriptions,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
