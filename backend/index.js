const mongoDB=require('./db');
mongoDB();

const express = require('express')




const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With,Content-Type,Accept'
  );
  next();
})
//middleware-within two process run this piece of code
app.use(express.json());
app.use('/api',require('./Routes/CreateUser'));
app.use('/api',require('./Routes/DisplayData'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})