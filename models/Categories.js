const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const categoriesSchema = Schema({
  name: {
    type: String,
    enum: {
      values: [
        "chinese",
        "japanese",
        "italian",
        "french",
        "western",
        "german",
        "russian",
        "vietnamese",
        "thai",
        "mexican",
        "pastries",
        "healthy",
        "indian",
      ],
    },
  },
});

const Categories = mongoose.model("Categories", categoriesSchema);

module.exports = Categories;
