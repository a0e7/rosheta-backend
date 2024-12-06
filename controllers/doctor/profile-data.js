const Doctor = require("../../models/doctor");

exports.getDoctor = async (req, res, next) => {
  const doctorId = req.user.userId;
  try {
    const doctor = await Doctor.findOne({ user_ID: doctorId });
    if (!doctor) {
      const error = new Error("Could not find Doctor");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Doctor fetched", doctor: doctor });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
