const Medicine = require("../../models/Medicine");

exports.postMedicine = async (req, res, next) => {
  if (!req.file) {
    const error = new Error("Image file is required");
    error.statusCode = 422;
    return next(error);
  }
  const medicineName = req.body.medicineName;
  const medicineChemicalName = req.body.medicineChemicalName;
  const medicineCompany = req.body.medicineCompany;
  const medicineOrgin = req.body.medicineOrgin;
  const photo = req.file.path.replace("\\", "/");

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
    const existingMedicine = await Medicine.findOne({ medicineName });
    if (existingMedicine) {
      return res.status(409).json({ message: "Medicine already exists" });
    }

    const medicine = await new Medicine({
      medicineName: medicineName,
      medicineChemicalName: medicineChemicalName,
      medicineCompany: medicineCompany,
      medicineOrgin: medicineOrgin,
      photo: photo,
    }).save();

    res.status(201).json({
      message: "Medicine created",
    });
  } catch (err) {
    console.error("Error creating medicine:", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
