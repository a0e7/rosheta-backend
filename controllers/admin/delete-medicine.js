const Medicine = require("../../models/Medicine");

exports.deleteMedicine = async (req, res, next) => {
  const medicineId = req.params.medicineId;
  try {
    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      const error = new Error("Could not find Medicine");
      error.statusCode = 404;
      throw error;
    }

    await Medicine.findByIdAndDelete(medicineId);

    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
