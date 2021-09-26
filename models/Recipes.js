const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipesSchema = Schema({
  name: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "Users" },
  categoryId: { type: Schema.Types.ObjectId, ref: "Categories" },
  description: { type: String },
  ingredients: [
    {
      ingredient: { type: Schema.Types.ObjectId, ref: "Ingredients" },
      quantity: { type: Number },
    },
  ],
  urlToImage: { type: String },
  isFeatured: { type: Boolean },
});

const Recipes = mongoose.model("Recipes", recipesSchema);

module.exports = Recipes;
