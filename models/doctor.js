const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

const Education = new Schema({
  university: {
    type: String,
    required: true,
  },
  graduationYear: {
    type: Number,
    required: true,
  },
  graduationCity: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  proficiency: {
    type: String,
    required: true,
  },
});

const doctorSchema = new Schema(
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
    PhoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    residenceCity: {
      type: String,
      required: true,
    },
    proficiency: {
      type: String,
      required: true,
    },
    briefHistory: {
      type: String,
      required: true,
    },
    workPlace: {
      type: String,
      required: true,
    },
    education: [Education],
    photo: {
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

module.exports = mongoose.model("Doctor", doctorSchema);
