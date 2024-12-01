const { strict } = require("assert");
const { timeStamp } = require("console");
const mongoose = require("mongoose");
// const Role = require("./role");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true, // By default, the account is active
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
