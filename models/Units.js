const mongoose = require("mongoose");
(slug = require("mongoose-slug-generator")), mongoose.plugin(slug);

const Schema = mongoose.Schema;
const unitsSchema = Schema({
  name: String,
  slug: { type: String, slug: "name" },
});

const Units = mongoose.model("units", unitsSchema);

module.exports = Units;
