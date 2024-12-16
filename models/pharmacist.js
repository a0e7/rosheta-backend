const { strict } = require("assert");
const { timeStamp } = require("console");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pharmacistSchema = new Schema(
  {
    user_ID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pharmacyName: {
      type: String,
      required: true,
    },
    pharmacyLocation: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    pharmacyEmployee: {
      type: String,
      required: true,
    },
    pharmacyEmployeeNumber: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pharmacist", pharmacistSchema);
