const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
 const userRoutes = require('./routes/user.route.js');
const app = express()
const verifyToken = require('./middleware/authMiddleware.js');
const productRoutes = require('./routes/product.route.js');
require('dotenv').config();




//MIDDLEWARE
app.use(express.json()) // Allow express to parse json
app.use(express.urlencoded({extended:false})) // Allow express to parse urlencoded data


// ROUTES
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);



  //FOR LOGGING TO TRACK REQUESTS
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// Test route
app.get('/', (req, res) => {  // create a get route
  res.send('Hello running from node api server updated');
});


// connect to mongodb database using mongoose
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(' Connected to Database');
    app.listen(process.env.PORT, () => {
      console.log(` Server is running on port ${process.env.PORT}`);
    });
  }
)


  .catch(err => {
    console.error(' Connection failed', err);
  });
