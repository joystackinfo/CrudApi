const express = require('express')
const mongoose = require('mongoose');
const app = express()



app.listen(3000, () => { // listens on port 3000
  console.log('Server is running on port 3000');// console a successfully message
})


app.get('/', (req, res) => {  // create a get route
  res.send('Hello running from node api server updated');
});


mongoose.connect('mongodb+srv://joynelsoninfo_db_user:<qG8EY1xOXk7mI5lM>@my-backend.minb8ea.mongodb.net/node-api?retryWrites=true&w=majority&appName=My-backend')
  .then(() => {
      console.log('Connected to Database');
  })
  .catch(err =>{
    console.error('Connection failed', err);
  });
