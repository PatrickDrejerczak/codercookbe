const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipesSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  categoryId: { type: Schema.Types.ObjectId, ref: "categories" },
  ingredient: [
    {
      ingredients: { type: Schema.Types.ObjectId, ref: "ingredients" },
      unit: { type: Schema.Types.ObjectId, ref: "units" },
      quantity: { type: Number },
    },
  ],
});

const Recipes = mongoose.model("recipes", recipesSchema);

module.exports = Recipes;
