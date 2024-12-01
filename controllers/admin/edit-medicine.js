const fs = require("fs");
const { validationResult } = require("express-validator");
const path = require("path");
const Medicine = require("../../models/Medicine");
const User = require("../../models/user");

exports.updateMedicine = async (req, res, next) => {
  const medicineId = req.body.medicineId;
  const medicineName = req.body.medicineName;
  const medicineChemicalName = req.body.medicineChemicalName;
  const medicineCompany = req.body.medicineCompany;
  const medicineOrgin = req.body.medicineOrgin;

  if (
    !medicineName ||
    !medicineChemicalName ||
    !medicineCompany ||
    !medicineOrgin
  ) {
    const error = new Error("All fields are required");
    error.statusCode = 422;
    return next(error);
  }

  try {
    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      const error = new Error("Could not find Medicine");
      error.statusCode = 404;
      throw error;
    }

    medicine.medicineName = medicineName;
    medicine.medicineChemicalName = medicineChemicalName;
    medicine.medicineCompany = medicineCompany;
    medicine.medicineOrgin = medicineOrgin;

    const result = await medicine.save();
    res.status(200).json({ message: "Medicine updated", medicine: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
