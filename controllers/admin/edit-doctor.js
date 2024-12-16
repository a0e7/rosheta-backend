const path = require("path");
const fs = require("fs");
const Doctor = require("../../models/doctor");
const User = require("../../models/user");

exports.updateDoctor = async (req, res, next) => {
  const doctorId = req.params.doctorId;
  const phoneNumber = req.body.PhoneNumber;
  const firstName = req.body.firstName;
  const middleName = req.body.middleName;
  const lastName = req.body.lastName;
  const dateOfBirth = req.body.dateOfBirth;
  const residenceCity = req.body.residenceCity;
  const proficiency = req.body.proficiency;
  const briefHistory = req.body.briefHistory;
  const workPlace = req.body.workPlace;
  const education = req.body.education;
  const imageUrl = req.body.image;
  if (
    !phoneNumber ||
    !firstName ||
    !middleName ||
    !lastName ||
    !dateOfBirth ||
    !residenceCity ||
    !proficiency ||
    !workPlace ||
    !education
  ) {
    const error = new Error("All fields are required");
    error.statusCode = 422;
    return next(error);
  }

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      const error = new Error("Could not find the doctor details");
      error.statusCode = 404;
      throw error;
    }

    const user = await User.findOne({ _id: doctor.user_ID });
    if (!user) {
      const error = new Error("Could not find Doctor");
      error.statusCode = 404;
      throw error;
    }

    user.phoneNumber = phoneNumber;
    await user.save();

    if (imageUrl) {
      imageUrl = req.file.path.replace("\\", "/");
    }

    const formattedEducation = Array.isArray(education)
      ? education
      : [education];

    doctor.firstName = firstName;
    doctor.middleName = middleName;
    doctor.lastName = lastName;
    doctor.PhoneNumber = phoneNumber;
    doctor.dateOfBirth = dateOfBirth;
    doctor.residenceCity = residenceCity;
    doctor.proficiency = proficiency;
    doctor.briefHistory = briefHistory;
    doctor.workPlace = workPlace;
    doctor.education = formattedEducation;
    if (imageUrl) {
      doctor.photo = imageUrl;
    }

    const result = await doctor.save();
    res.status(200).json({ message: "Doctor updated", doctor: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
