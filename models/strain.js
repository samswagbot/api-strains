const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const strainSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: String,
    imgUrl: String,
    thcLevel: String,
    effects: Object,
    mostCommonTerpene: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Strain", strainSchema);
