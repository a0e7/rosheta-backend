const User = require("../../models/user");
const Pharamcy = require("../../models/pharmacist");

exports.deactivatePharmacy = async (req, res, next) => {
  const pharmacyId = req.params.pharmacyId;

  try {
    const pharamacy = await Pharamcy.findById(pharmacyId);
    if (!pharamacy) {
      const error = new Error("Could not find Pharmacy");
      error.statusCode = 404;
      throw error;
    }
    const userId = pharamacy.user_ID;
    const user = await User.findById(userId);

    pharamacy.isActive = false;
    await pharamacy.save();

    user.isActive = false;
    await user.save();

    res.status(200).json({ message: "Pharamcy account deactivated" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
