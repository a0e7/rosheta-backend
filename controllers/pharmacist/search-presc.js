const Prescription = require("../../models/prescription");

exports.searchPresciption = async (req, res, next) => {
  // try {
  // const { query } = req.query;

  // const prescriptions = await Prescription.find({
  //   prescriptionId: { $regex: `^${query}`, $options: "i" },
  // }).limit(10);
  const prescriptionId = req.params.prescriptionId;
  try {
    const prescription = await Prescription.findOne({
      prescriptionId: prescriptionId,
    });
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
