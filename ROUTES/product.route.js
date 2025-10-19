const express = require('express');
const Product = require('../models/product.model.js');
const router = express.Router();
const{getProducts, getProduct , createProduct, updateProduct , deleteProduct } = require('../controllers/product.controller.js');


// Get all products
router.get('/', getProducts);

// Get a single product by ID
router.get("/:id", getProduct);

//Create a product
router.post('/', createProduct);

//update a product
router.put('/:id', updateProduct);

//delete a product
router.delete('/:id', deleteProduct);


module.exports = router;