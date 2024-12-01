const fs = require("fs");
const { validationResult } = require("express-validator");
const path = require("path");
const Medicine = require("../../models/Medicine");

exports.searchMedicine = async (req, res, next) => {
  try {
    const { query } = req.query; // Query from frontend (e.g., 'pa' for Paracetamol)

    // Check if query is empty or just whitespace
    if (!query || query.trim() === "") {
      return res.json([]); // Return empty array for no results
    }

    // Search for medicines that include the query (case-insensitive)
    const medicines = await Medicine.find({
      medicineName: { $regex: `^${query}`, $options: "i" }, // Case-insensitive search
    })
      .limit(20)
      .select("medicineName"); // Limit results to the first 10

    res.json(medicines); // Send matching medicines back to frontend
  } catch (err) {
    res.status(500).send("Error searching medicines");
  }
};
