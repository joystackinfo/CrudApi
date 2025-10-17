const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express()
const productRoutes = require('./routes/product.route.js');


//MIDDLEWARE
app.use(express.json()) // Allow express to parse json
app.use(express.urlencoded({extended:false})) // Allow express to parse urlencoded data

// ROUTES
app.use("/api/products", productRoutes);





app.get('/', (req, res) => {  // create a get route
  res.send('Hello running from node api server updated');
});





// Allowing products viewing from database
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({}); // find all products in database
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// For viewing single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params; //destruct the id from params
    const product = await Product.findById(id); // to find the product by id
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Adding multiple products to database
app.post('/api/products', async (req, res) => {
  try {
    const products = await Product.create(req.body);  //wait for the product to be created in database
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update the product
app.put('/api/products/:id', async (req, res) => {

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

});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
   try {
     const { id } = req.params; //destruct the id from params
   

    const product = await Product.findByIdAndDelete(id); // to find and delete the product by id

      if(!product){
        return res.status(404).json({ msg: "product not found" });
      }
      console.log("Product deleted:", product.name);
       res.status(200).json({msg: " product deleted succesfully"});
     
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
  

// connect to mongodb database using mongoose
mongoose.connect('mongodb+srv://joynelsoninfo_db_user:RHbYyQ9PXy7r8ax0@my-backend.minb8ea.mongodb.net/?retryWrites=true&w=majority&appName=My-backend')
  .then(() => {
    console.log(' Connected to Database');
    app.listen(3000, () => {
      console.log(' Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error(' Connection failed', err);
  });
