// models/role.js
const mongoose = require("mongoose");
// const Permission = require('./permission');  // Import Permission model

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // e.g. 'admin', 'doctor'
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }], // Array of permissions
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
