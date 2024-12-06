const Doctor = require("../../models/doctor");
const User = require("../../models/user");

exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ message: "Fetched", doctors: doctors });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getDoctor = async (req, res, next) => {
  const doctorId = req.params.doctorId;
  try {
    const user = await User.findById(doctorId).select("phoneNumber");
    if (!user) {
      const error = new Error("Could not find Doctor");
      error.statusCode = 404;
      throw error;
    }
    const doctor = await Doctor.findOne({ user_ID: doctorId });
    if (!doctor) {
      const error = new Error("Could not find Doctor details");
      error.statusCode = 404;
      throw error;
    }
    res
      .status(200)
      .json({ message: "Doctor fetched", user: user, doctor: doctor });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
