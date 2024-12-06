const fs = require("fs");
const { validationResult } = require("express-validator");
const path = require("path");
const Prescription = require("../../models/prescription");

exports.countPrescription = async (req, res, next) => {
  try {
    const pharamacyId = req.user.userId;

    const [result] = await Prescription.aggregate([
      {
        $match: { pharamacy: pharamacyId },
      },
      {
        $facet: {
          dispensedPrescriptions: [
            { $match: { isDispensed: true } },
            { $count: "dispensed" }, // ??
          ],
        },
      },
    ]);

    const dispensePrescriptions =
      result?.dispensedPrescriptions[0]?.dispensed || 0;

    res.status(200).json({
      message: "Prescription count fetched successfully",
      dispensePrescriptions,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
