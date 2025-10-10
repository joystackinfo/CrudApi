const express = require('express')
const mongoose = require('mongoose');
const app = express()


app.use(express.json()) // Allow express to parse json



app.get('/', (req, res) => {  // create a get route
  res.send('Hello running from node api server updated');

});

app.post('/api/products', (req, res) => {
  console.log(res.boby)
  res.send(res.boby)
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