const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Prescription = new Schema({
  medicineName: { type: String, required: true },
  quantity: { type: Number, required: true },
  usage: { type: String },
  note: { type: String },
  photo: {
    type: String,
    default: null,
  },
  isDispensed: { type: Boolean, default: false },
});

const prescriptionSchema = new Schema(
  {
    prescriptionId: { type: String, required: true },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorName: {
      type: String,
    },
    pharmacy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    pharmacyName: {
      type: String,
      default: null,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    patientName: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    prescriptionDetails: [Prescription],
    isDispensed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("prescription", prescriptionSchema);
