const express =require('express')
const app = express()
require('./configs/connectDB')
const cors = require("cors");
const items = require('./routes/routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/item_data', items);

// app.use(express.static('www'))
app.listen(3000,() =>{
    console.log("APP Listening on port 3000")
})




