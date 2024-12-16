const User = require("../../models/user");
const Doctor = require("../../models/doctor");

exports.deactivateDoctor = async (req, res, next) => {
  const doctorId = req.params.doctorId;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      const error = new Error("Could not find Doctor");
      error.statusCode = 404;
      throw error;
    }
    const userId = doctor.user_ID;
    const user = await User.findById(userId);

    doctor.isActive = false;
    await doctor.save();

    user.isActive = false;
    await user.save();

    res.status(200).json({ message: "Doctor account deactivated" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
