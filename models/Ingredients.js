const mongoose = require("mongoose");
(slug = require("mongoose-slug-generator")), mongoose.plugin(slug);

const Schema = mongoose.Schema;
const ingredientsSchema = Schema({
  name: String,
  slug: { type: String, slug: "name" },
  type: {
    type: String,
    enum: {
      values: ["main", "spice"],
    },
  },
});

const Ingredients = mongoose.model("ingredients", ingredientsSchema);

module.exports = Ingredients;
