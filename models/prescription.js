const mongoose = require("mongoose");

const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

const Prescription = new Schema({
  medicineName: { type: String, required: true },
  quantity: { type: Number, required: true },
  usage: { type: String },
  note: { type: String },
  isDispensed: { type: Boolean, default: false },
});

const prescriptionSchema = new Schema(
  {
    prescriptionId: { type: String, default: uuidv4 },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pharmacy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    }, // add date
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
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
