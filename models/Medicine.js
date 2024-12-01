const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new Schema(
  {
    medicineName: {
      type: String,
      required: [true, "Medicine name is required"],
      unique: true,
      trim: true,
      minlength: [3, "Medicine name must be at least 3 characters long"],
    },
    medicineChemicalName: {
      type: String,
      required: [true, "Chemical name is required"],
      trim: true,
    },
    medicineCompany: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    medicineOrgin: {
      type: String,
      required: [true, "Origin is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

medicineSchema.index({ medicineName: 1 }, { unique: true });

module.exports = mongoose.model("Medicine", medicineSchema);
