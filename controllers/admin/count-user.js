const User = require("../../models/user");
const Medicine = require("../../models/Medicine");

exports.getUsers = async (req, res, next) => {
  try {
    const result = await User.aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          as: "roleDetails",
        },
      },
      {
        $unwind: {
          path: "$roleDetails",
          preserveNullAndEmptyArrays: true, // Preserve users without a role
        },
      },
      {
        $facet: {
          totalPharmacies: [
            { $match: { "roleDetails.name": "pharmacy" } },
            { $count: "total" },
          ],
          totalPatients: [
            { $match: { "roleDetails.name": "patient" } },
            { $count: "total" },
          ],
          totalDoctors: [
            { $match: { "roleDetails.name": "doctor" } },
            { $count: "total" },
          ],
        },
      },
    ]);

    const totalMedicines = await Medicine.find().countDocuments();

    const totalPharmacies = result[0]?.totalPharmacies[0]?.total || 0;
    const totalPatients = result[0]?.totalPatients[0]?.total || 0;
    const totalDoctors = result[0]?.totalDoctors[0]?.total || 0;

    res.status(200).json({
      message: "Fetched",
      totalPharmacies,
      totalPatients,
      totalDoctors,
      totalMedicines,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
