
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

// Controller function to get a single product by ID
const getProduct =  async (req, res) => {
  try {
    const { id } = req.params; //destruct the id from params
    const product = await Product.findById(id); // to find the product by id
    res.status(200).json(product);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//controlller functin for create product
const createProduct = async (req , res ) =>{

  try {
    const products = await Product.create(req.body);  //wait for the product to be created in database
    res.status(200).json(products);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  
  }
};

//controller fuction for update product
const updateProduct = async (req, res) => {

  try {
    const { id } = req.params; //destruct the id from params
    console.log("ID being updated:", id);
    console.log("Request body:", req.body);

    const product = await Product.findByIdAndUpdate(id, req.body, { new: true }); // to find and update the product by id
  if(!product){
        return res.status(404).json({ msg: "product not found" });
  }
    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct, 
  createProduct,
  updateProduct
};  // to export the file