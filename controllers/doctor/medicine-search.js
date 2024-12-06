const Medicine = require("../../models/Medicine");

exports.searchMedicine = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.json([]);
    }

    const medicines = await Medicine.find({
      medicineName: { $regex: `^${query}`, $options: "i" },
    })
      .limit(20)
      .select("medicineName");

    res.json(medicines);
  } catch (err) {
    res.status(500).send("Error searching medicines");
  }
};
