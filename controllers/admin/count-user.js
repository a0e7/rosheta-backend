const fs = require("fs");
const { validationResult } = require("express-validator");
const path = require("path");
const User = require("../../models/user");
const Medicine = require("../../models/Medicine");

exports.getUsers = async (req, res, next) => {
  try {
    const result = await User.aggregate([
      {
        // Perform a join with the 'Role' collection to get the role name
        $lookup: {
          from: "roles", // Name of the collection for roles
          localField: "role", // The field in 'User' that references the 'Role'
          foreignField: "_id", // The field in 'Role' that we are joining on
          as: "roleDetails", // Alias for the joined data
        },
      },
      {
        // Flatten the roleDetails array (we only need the first matched role)
        $unwind: {
          path: "$roleDetails",
          preserveNullAndEmptyArrays: true, // Preserve users without a role
        },
      },
      {
        // Group by role name and count the number of users for each role
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

    // Medicine count
    const totalMedicines = await Medicine.find().countDocuments();

    // Extract counts from the result
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
