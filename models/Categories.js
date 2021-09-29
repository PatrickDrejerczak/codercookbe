const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const categoriesSchema = Schema({
  name: { type: String },
});

const Categories = mongoose.model("Categories", categoriesSchema);

module.exports = Categories;
