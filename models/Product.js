const mongoose = require("mongoose");
const { Schema } = mongoose;

const Product = new Schema ({
    name: {
        type: String,
        required: [true, "product requires a name"]
    },
    description: {
        type: String,
        required: [true, "Product requires a description"]
    },
    price: {
        type: Number,
        min: [0.01, "Price must be greater than 0"]
    },
    category: {
        type: String,
        required: [true, "Product requires a category"]
    },
    tags: {
        type: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Product