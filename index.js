const express = require('express')
const app = express()

app.listen(3000, () => { // listens on port 3000
  console.log('Server is running on port 3000');// console a successfully message
})


app.get('/', (req, res) => {  // create a get route
  res.send('Hello running from node api server updated');
});
