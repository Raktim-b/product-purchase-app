const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PurchaseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "registration",
      required: true,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const PurchaseModel = mongoose.model("purchase", PurchaseSchema);
module.exports = PurchaseModel;
