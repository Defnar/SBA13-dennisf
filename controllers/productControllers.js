const Product = require("../models/Product")

const postProduct = async (req, res) => {
    try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
    }
    catch (err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = {postProduct}