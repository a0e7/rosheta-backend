const Prescription = require("../../models/prescription");
const mongoose = require("mongoose");

exports.countPrescription = async (req, res, next) => {
  try {
    const doctorId = new mongoose.Types.ObjectId(req.user.userId);

    const [result] = await Prescription.aggregate([
      {
        $match: { doctor: doctorId },
      },
      {
        $facet: {
          totalPrescriptions: [{ $count: "total" }],
          dispensedPrescriptions: [
            { $match: { isDispensed: true } },
            { $count: "dispensed" },
          ],
        },
      },
    ]);

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
