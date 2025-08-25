const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "product requires a name"],
  },
  description: {
    type: String,
    required: [true, "Product requires a description"],
  },
  price: {
    type: Number,
    required: [true, "Product requires a price"],
    min: [0.01, "Price must be greater than 0"],
  },
  category: {
    type: String,
    required: [true, "Product requires a category"],
  },
  tags: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
