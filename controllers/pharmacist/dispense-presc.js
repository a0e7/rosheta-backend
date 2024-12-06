const Prescription = require("../../models/prescription");

exports.dispensePresciption = async (req, res, next) => {
  const pharmacyId = req.user.userId;
  const prescriptionId = req.body.prescriptionId;
  const prescriptionDetails = req.body.prescriptionDetails;

  try {
    const prescription = await Prescription.findOne({ prescriptionId });

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    // Update the `isDispensed` field for each medicine
    prescriptionDetails.forEach((updatedMedicine) => {
      const medicine = prescription.prescriptionDetails.find(
        (m) => m.medicineId === updatedMedicine.medicineId
      );
      if (medicine) {
        medicine.isDispensed = updatedMedicine.isDispensed || false;
      }
    });

    prescription.pharmacy = pharmacyId;
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
