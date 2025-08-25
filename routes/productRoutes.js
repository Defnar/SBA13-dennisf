const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers");

//create product
router.post("/", productControllers.postProduct);

//get a single product
router.get("/:id", productControllers.getProduct);

//get all products
router.get("/", productControllers.getAllProducts);

//edit a product
router.put("/:id", productControllers.putProduct);

//delete a product
router.delete("/:id", productControllers.deleteProduct);

module.exports = router;
