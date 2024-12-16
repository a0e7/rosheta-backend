const Prescription = require("../../models/prescription");
const Pharmacist = require("../../models/pharmacist");
const mongoose = require("mongoose");

exports.dispensePresciption = async (req, res, next) => {
  const prescriptionId = new mongoose.Types.ObjectId(req.params.prescriptionId);

  const prescriptionDetails = req.body.prescriptionDetails;

  try {
    const pharmacyId = new mongoose.Types.ObjectId(req.user.userId);

    const prescription = await Prescription.findById(prescriptionId);
    const pharamcy = await Pharmacist.findOne({ user_ID: pharmacyId });

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    prescription.prescriptionDetails = prescriptionDetails;

    prescription.pharmacy = pharmacyId;
    prescription.pharmacyName = pharamcy.pharmacyName;

    prescription.isDispensed = true;
    await prescription.save();

    res.status(201).json({
      message: "Prescription Dispensed",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
