const User = require("../../models/user");

exports.activatePharmacy = async (req, res, next) => {
  const pharmacyId = req.params.pharmacyId;

  try {
    const pharmacy = await User.findById(pharmacyId);
    if (!pharmacy) {
      const error = new Error("Could not find Pharmacy");
      error.statusCode = 404;
      throw error;
    }

    pharmacy.isActive = true;
    await pharmacy.save();

    res.status(200).json({ message: "Pharamcy account activated" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
