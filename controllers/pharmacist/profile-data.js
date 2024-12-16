const Pharmacy = require("../../models/pharmacist");
const User = require("../../models/user");
const mongoose = require("mongoose");

exports.getPharmacy = async (req, res, next) => {
  const pharamacyId = new mongoose.Types.ObjectId(req.user.userId);
  try {
    const user = await User.findById(pharamacyId);
    if (!user) {
      const error = new Error("Could not find Pharamcy");
      error.statusCode = 404;
      throw error;
    }
    const pharmacy = await Pharmacy.findOne({ user_ID: pharamacyId });
    res.status(200).json({ message: "Pharmacy fetched", pharmacy: pharmacy });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
