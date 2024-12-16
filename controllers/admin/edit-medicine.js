const Medicine = require("../../models/Medicine");

exports.updateMedicine = async (req, res, next) => {
  const medicineId = req.params.medicineId;
  const medicineName = req.body.medicineName;
  const medicineChemicalName = req.body.medicineChemicalName;
  const medicineCompany = req.body.medicineCompany;
  const medicineOrgin = req.body.medicineOrgin;
  const imageUrl = req.body.image;

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
    if (imageUrl) {
      if (medicine.photo) {
        const filePath = path.join(__dirname, "images", medicine.photo);
        await fs.unlink(filePath);
      }
    }
    if (imageUrl) {
      imageUrl = req.file.path.replace("\\", "/");
    }
    medicine.medicineName = medicineName;
    medicine.medicineChemicalName = medicineChemicalName;
    medicine.medicineCompany = medicineCompany;
    medicine.medicineOrgin = medicineOrgin;
    if (imageUrl) {
      medicine.photo = imageUrl;
    }

    await medicine.save();
    res.status(200).json({ message: "Medicine updated" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
