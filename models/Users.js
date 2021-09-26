const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
  return accessToken;
};

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
