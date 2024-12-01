const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // e.g. 'create prescription', 'delete user'
  },
  { timestamps: true }
);

module.exports = mongoose.model("Permission", permissionSchema);
