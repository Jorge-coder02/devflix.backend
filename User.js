const mongoose = require("mongoose");
// Schema
const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { timestamps: true }
);
// Model
const User = mongoose.model("User", userSchema);
module.exports = User;
