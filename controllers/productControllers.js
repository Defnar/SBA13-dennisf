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

const getProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findbyId(id);

        if (!product) throw new Error("Product not found");
        res.json(product);
    }
    catch (err) {
        res.status(404).json({error: err.message})
    }

}

module.exports = {postProduct, getProduct}