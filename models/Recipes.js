const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipesSchema = Schema({
  name: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "Users" },
  categoryId: { type: Schema.Types.ObjectId, ref: "Categories" },
  description: { type: String },
  cookingInstruction: { type: String },
  urlToImage: { type: String },
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  ingredients: [
    {
      ingredient: { type: Schema.Types.ObjectId, ref: "Ingredients" },
      quantity: { type: Number },
    },
  ],
});

const Recipes = mongoose.model("Recipes", recipesSchema);

module.exports = Recipes;
