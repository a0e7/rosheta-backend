const { strict } = require("assert");
const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");
// const Role = require("./role");
const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    user_ID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    residenceCity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
