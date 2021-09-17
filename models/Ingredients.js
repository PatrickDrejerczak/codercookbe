const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ingredientsSchema = Schema({
  name: String,
  type: {
    type: String,
    enum: {
      values: ["main", "spice"],
    },
  },
  unit: String,
});

const Ingredients = mongoose.model("Ingredients", ingredientsSchema);

module.exports = Ingredients;
