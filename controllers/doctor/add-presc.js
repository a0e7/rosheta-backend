const Prescription = require("../../models/prescription");
const User = require("../../models/user");
const Doctor = require("../../models/doctor");
const Medicine = require("../../models/Medicine");
const Patient = require("../../models/patient");
const Counter = require("../../models/counter");
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const mongoose = require("mongoose");
const patient = require("../../models/patient");

exports.postPresciption = async (req, res, next) => {
  const doctorId = new mongoose.Types.ObjectId(req.user.userId);

  const patientNumber = req.body.phoneNumber;
  const patientName = req.body.patientName;
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
    const doctor = await Doctor.findOne({ user_ID: doctorId });
    const patient = await Patient.findOne({ user_ID: user.id });

    for (let detail of formattedDetails) {
      const medicine = await Medicine.findOne({
        medicineName: detail.medicineName,
      });

      if (medicine) {
        detail.photo = medicine.photo;
      }
    }

    async function generateNumericCode() {
      const counter = await Counter.findOne({ name: "counter" });
      if (counter) {
        counter.seq += 1;
        await counter.save();
      } else {
        const newCounter = new Counter({ name: "counter", seq: 1 });
        await newCounter.save();
      }

      return counter.seq;
    }
    const prescriptionCode = await generateNumericCode();

    const prescription = new Prescription({
      prescriptionId: prescriptionCode,
      doctor: doctorId,
      doctorName:
        doctor.firstName + " " + doctor.middleName + " " + doctor.lastName,
      patient: user ? user._id : null,
      patientName: patient
        ? patient.firstName + " " + patient.lastName
        : patientName,
      phoneNumber: patientNumber,
      prescriptionDetails: formattedDetails,
    });
    await prescription.save();
    numberTosend = "+967" + patientNumber;
    const message = await client.messages.create({
      body: `رقم الروشته الخاص بك هو: ${prescriptionCode}`,
      from: process.env.TWILIO_NUMBER,
      to: numberTosend,
    });

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
