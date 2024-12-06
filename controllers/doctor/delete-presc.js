const Prescription = require("../../models/prescription");

exports.deletePrescription = async (req, res, next) => {
  const prescriptionId = req.params.prescriptionId;
  try {
    const prescription = await Prescription.findByIdAndDelete(prescriptionId);
    if (!prescription) {
      const error = new Error("Could not find prescription");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
