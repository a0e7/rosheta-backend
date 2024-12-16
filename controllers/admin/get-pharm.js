const Pharmacy = require("../../models/pharmacist");
const User = require("../../models/user");

exports.getPharmacies = async (req, res, next) => {
  try {
    const pharamacies = await Pharmacy.find();
    res.status(200).json({ message: "Fetched", pharamacies: pharamacies });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPharmacy = async (req, res, next) => {
  const pharmacyId = req.params.pharmacyId;
  try {
    const user = await Pharmacy.findById(pharmacyId);
    if (!user) {
      const error = new Error("Could not find Pharmacy");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Pharmacy fetched", pharamacy: user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
