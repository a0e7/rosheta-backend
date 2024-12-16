const Pharmacy = require("../../models/pharmacist");
const User = require("../../models/user");

exports.updatePharmacy = async (req, res, next) => {
  const pharmacyId = req.params.pharmacyId;
  const phoneNumber = req.body.phoneNumber;
  const pharmacyName = req.body.pharmacyName;
  const pharmacyLocation = req.body.pharmacyLocation;
  const pharmacyEmployee = req.body.pharmacyEmployee;
  const pharmacyEmployeeNumber = req.body.pharmacyEmployeeNumber;

  if (
    !phoneNumber ||
    !pharmacyName ||
    !pharmacyLocation ||
    !pharmacyEmployee ||
    !pharmacyEmployeeNumber
  ) {
    const error = new Error("All fields are required");
    error.statusCode = 422;
    return next(error);
  }

  try {
    const pharmacy = await Pharmacy.findById(pharmacyId);

    if (!pharmacy) {
      const error = new Error("Could not find the pharmacy details");
      error.statusCode = 404;
      throw error;
    }

    const userId = pharmacy.user_ID;

    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("Could not find Pharmacy");
      error.statusCode = 404;
      throw error;
    }

    user.phoneNumber = phoneNumber;
    await user.save();

    pharmacy.pharmacyName = pharmacyName;
    pharmacy.pharmacyLocation = pharmacyLocation;
    pharmacy.phoneNumber = phoneNumber;
    pharmacy.pharmacyEmployee = pharmacyEmployee;
    pharmacy.pharmacyEmployeeNumber = pharmacyEmployeeNumber;

    const result = await pharmacy.save();
    res.status(200).json({ message: "Pharmacy updated", pharamacy: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
