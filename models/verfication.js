const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema
const verificationSchema = new Schema({
  phoneNumber: { type: Number, required: true },
  verificationCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 },
});

// Create the model
module.exports = mongoose.model("Verification", verificationSchema);
