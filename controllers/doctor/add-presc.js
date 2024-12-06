const Prescription = require("../../models/prescription");
const User = require("../../models/user");

exports.postPresciption = async (req, res, next) => {
  const doctorId = req.user.userId;
  const patientNumber = req.body.patientNumber;
  const prescriptionDetails = req.body.prescriptionDetails;

  if (!doctorId || !patientNumber || !prescriptionDetails) {
    const error = new Error("All fields are required.");
    error.statusCode = 422;
    return next(error);
  }

  try {
    const formattedDetails = Array.isArray(prescriptionDetails)
      ? prescriptionDetails
      : [prescriptionDetails];

    const user = await User.findOne({ phoneNumber: patientNumber });

    const prescription = new Prescription({
      doctor: doctorId,
      patient: user ? user._id : null,
      phoneNumber: patientNumber,
      prescriptionDetails: formattedDetails,
    });
    await prescription.save();

    res.status(201).json({
      message: "Prescription created",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
