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


// Test route
app.get('/', (req, res) => {  // create a get route
  res.send('Hello running from node api server updated');
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
