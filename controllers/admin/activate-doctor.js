const User = require("../../models/user");
const Doctor = require("../../models/doctor");

exports.activateDoctor = async (req, res, next) => {
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

    doctor.isActive = true;
    await doctor.save();

    user.isActive = true;
    await user.save();

    res.status(200).json({ message: "Doctor account activated" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
