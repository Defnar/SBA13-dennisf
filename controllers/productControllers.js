const {
  MalformedSortError,
  MissingProductsError,
} = require("../ErrorHandling/customErrors");
const Product = require("../models/Product");

const postProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) throw new MissingProductsError("Product not found");
    res.json(product);
  } catch (err) {
    if (err instanceof MissingProductsError)
      res.status(404).json({ error: err.message });
    else res.status(500).json({ error: err.message });
  }
};

const putProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const edit = req.body;

    const product = await Product.findByIdAndUpdate(id, edit, { new: true });

    if (!product) throw new MissingProductsError("Product not found");
    res.json(product);
  } catch (err) {
    if (err instanceof MissingProductsError)
      res.status(404).json({ error: err.message });
    else res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findByIdAndDelete(id);

    if (!product) throw new MissingProductsError("Product not found");

    res.send("Product successfully deleted");
  } catch (err) {
    if (err instanceof MissingProductsError)
      res.status(404).json({ error: err.message });
    else res.status(500).json({ error: err.message });
  }
};

//a short note, asc and desc should be denoted by method: name | price | category, and
// should be denoted like name_asc, price_asc, category_asc.
//following the instructions given by the assignment, which seems to only provide for one
//sort method
const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      sortBy = "price_desc",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    const price = {};
    if (minPrice) {
      price[$gte] = minPrice;
    }
    if (maxPrice) {
      price[$lte] = maxPrice;
    }

    if (minPrice || maxPrice) {
      query[price] = price;
    }
    if (category) {
      query[category] = category;
    }

    //splits the sort method into category to sort, and whether asc or desc
    const sortMethod = sortBy.split("_");

    //should create an array of something like ["price", "asc"]
    if (sortMethod[1] !== "asc" && sortMethod[1] !== "desc") {
      throw new MalformedSortError("Malformed sort by query");
    }

    const sortParam = {};
    sortParam[sortMethod[0]] = sortMethod[1] === "asc" ? 1 : -1;

    const products = await Product.find({})
      .sort(sortParam)
      .skip((page - 1) * limit)
      .limit(limit);

    if (products.length === 0)
      throw new MissingProductsError("No Products Found");
    res.json(products);
  } catch (err) {
    if (err instanceof MalformedSortError)
      res
        .status(400)
        .json({ error: "Sort method must end with asc or desc on end" });
    else if (err instanceof MissingProductsError)
      res.status(404).json({ error: err.message });
    else {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = {
  postProduct,
  getProduct,
  putProduct,
  deleteProduct,
  getAllProducts,
};
