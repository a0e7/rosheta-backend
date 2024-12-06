const Prescription = require("../../models/prescription");

exports.searchPresciption = async (req, res, next) => {
  try {
    const { query } = req.query;

    const prescriptions = await Prescription.find({
      prescriptionId: { $regex: `^${query}`, $options: "i" },
    }).limit(30);

    res.json(prescriptions);
  } catch (err) {
    res.status(500).send("Error searching prescriptions");
  }
  next(err);
};
