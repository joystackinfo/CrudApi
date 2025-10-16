
const Product = require('../models/product.model.js'); //



// Controller function to get all products
const getProducts = async (req, res) => {

  try {
    const products = await Product.find({}); // find all products in database
    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getProduct =  async (req, res) => {
  try {
    const { id } = req.params; //destruct the id from params
    const product = await Product.findById(id); // to find the product by id
    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  
module.exports = {
  getProducts,
  getProduct
};  // to export the file