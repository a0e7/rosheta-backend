const User = require("../../models/user");

exports.activateDoctor = async (req, res, next) => {
  const doctorId = req.params.doctorId;

  try {
    const doctor = await User.findById(doctorId);
    if (!doctor) {
      const error = new Error("Could not find Doctor");
      error.statusCode = 404;
      throw error;
    }

    doctor.isActive = true;
    await doctor.save();

    res.status(200).json({ message: "Doctor account activated" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
