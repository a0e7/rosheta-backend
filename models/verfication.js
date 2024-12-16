const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema
const verificationSchema = new Schema({
  phoneNumber: { type: Number, required: true, unique: true },
  verificationCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // Document expires after 5 minutes
});

// Create the model
module.exports = mongoose.model("Verification", verificationSchema);