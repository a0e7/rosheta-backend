const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const counterSchema = new Schema({
  name: { type: String, default: "counter" },
  seq: { type: Number, required: true, unique: true },
});

module.exports = mongoose.model("Counter", counterSchema);
