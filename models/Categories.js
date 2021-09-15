const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const categoriesSchema = Schema({
  name: {
    type: String,
    enum: {
      values: [
        "chinese",
        "japanese",
        "italien",
        "french",
        "western",
        "german",
        "russian",
        "vietnamese",
        "thai",
        "mexican",
        "pastries",
        "healthy",
      ],
    },
  },
});

const Categories = mongoose.model("categories", categoriesSchema);

module.exports = Categories;
