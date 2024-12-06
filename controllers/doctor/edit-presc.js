const Prescription = require("../../models/prescription");
const User = require("../../models/user");

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
    const user = await User.findOne({ phoneNumber: patientNumber });

    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    prescription.patient = user ? user._id : null;
    prescription.patientNumber = patientNumber;
    prescription.prescriptionDetails = Array.isArray(prescriptionDetails)
      ? prescriptionDetails
      : [prescriptionDetails];

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
