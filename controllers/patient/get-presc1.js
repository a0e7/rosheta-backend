const Prescription = require("../../models/prescription");
const mongoose = require("mongoose");

exports.getPrescriptions = async (req, res, next) => {
  try {
    const patientId = new mongoose.Types.ObjectId(req.user.userId);

    const prescriptions = await Prescription.findOne({ patient: patientId });

    if (!prescriptions || prescriptions.length === 0) {
      return res
        .status(404)
        .json({ message: "No prescriptions found for this doctor." });
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