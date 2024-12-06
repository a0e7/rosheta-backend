const Doctor = require("../../models/doctor");
const User = require("../../models/user");
const Role = require("../../models/roles");
const bcrypt = require("bcryptjs");

exports.postDoctor = async (req, res, next) => {
  if (!req.file) {
    const error = new Error("Image file is required");
    error.statusCode = 422;
    return next(error);
  }

  const doctorRole = await Role.findOne({ name: "doctor" });
  if (!doctorRole) {
    const newRole = new Role({ name: "doctor" });
    await newRole.save();
    doctorRole = newRole;
  }

  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  const role = doctorRole;
  const firstName = req.body.firstName;
  const middleName = req.body.middleName;
  const lastName = req.body.lastName;
  const dateOfBirth = req.body.dateOfBirth;
  const residenceCity = req.body.residenceCity;
  const proficiency = req.body.proficiency;
  const briefHistory = req.body.briefHistory;
  const workPlace = req.body.workPlace;
  const education = req.body.education;
  const imageUrl = req.file.path.replace("\\", "/");

  if (
    !phoneNumber ||
    !password ||
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
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(409).json({ message: "Phone number already exists" });
    }

    const hashedpw = await bcrypt.hash(password, 12);
    const user = await new User({
      phoneNumber: phoneNumber,
      password: hashedpw,
      role: role,
    }).save();

    const formattedEducation = Array.isArray(education)
      ? education
      : [education];

    const doctor = await new Doctor({
      user_ID: user._id,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      residenceCity: residenceCity,
      proficiency: proficiency,
      briefHistory: briefHistory,
      workPlace: workPlace,
      education: formattedEducation,
      photo: imageUrl,
    }).save();

    res.status(201).json({
      message: "Doctor created",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
