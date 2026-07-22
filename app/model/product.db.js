const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },

  price: {
    type: Number,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    // required: true,
  },
  public_id: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});
const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;
