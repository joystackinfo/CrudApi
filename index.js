const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express()

app.use(express.json()) // Allow express to parse json

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
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Adding multiple products to database
app.post('/api/products', async (req, res) => {
  try {
    const products = await Product.create(req.body);
    res.status(200).json(products);
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
