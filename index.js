const express = require('express')
const mongoose = require('mongoose');
const product = require('./models/product.model.js');
const app = express()


app.use(express.json()) // Allow express to parse json



app.get('/', (req, res) => {  // create a get route
  res.send('Hello running from node api server updated');

});

// Allowing products viewing from database

app.post('/api/products', async (req, res) => {

  try {
    const products = await product.find({}); // create a new product using the product model and the request body
      res.status(200).json(products);

  } catch (error) {
    res.status(500).json({message:error.message});
  }
  });

// adding multiple products to database
app.post('/api/products', async (req, res) => {

  try {

    const products = await product.create(req.body); // create a new product using the product model and the request body
      res.status(200).json(products);

  } catch (error) {
    res.status(500).json({message:error.message});
    
  }

});


// connect to mongodb database using mongoose
mongoose.connect('mongodb+srv://joynelsoninfo_db_user:RHbYyQ9PXy7r8ax0@my-backend.minb8ea.mongodb.net/?retryWrites=true&w=majority&appName=My-backend')

  .then(() => {
      console.log('Connected to Database');
       app.listen(3000, () => { // listens on port 3000
  console.log('Server is running on port 3000');// console a successfully message
})
  })

.catch(err =>{
    console.error('Connection failed', err);
  });