const Pharmacy = require("../../models/pharmacist");
const User = require("../../models/user");

exports.getPharmacy = async (req, res, next) => {
  const pharmacyId = "674a1d03ff5abc35a47ba998";
  try {
    const user = await User.findById(pharmacyId);
    if (!user) {
      const error = new Error("Could not find Pharamcy");
      error.statusCode = 404;
      throw error;
    }
    const pharmacy = await Pharmacy.findOne({ user_ID: pharmacyId });
    res.status(200).json({ message: "Pharmacy fetched", pharmacy: pharmacy });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
