const Patient = require("../../models/patient");
const User = require("../../models/user");

exports.getPatient = async (req, res, next) => {
  const patientId = req.user.userId;
  try {
    const user = await User.findById(patientId);
    if (!user) {
      const error = new Error("Could not find Patient");
      error.statusCode = 404;
      throw error;
    }
    const patient = await Patient.findOne({ user_ID: patientId });
    res.status(200).json({ message: "Patient fetched", patient: patient });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
