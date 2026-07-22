const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },

  image: {
    type: String,
    // required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});
const CategoryModel = mongoose.model("category", CategorySchema);
module.exports = CategoryModel;
