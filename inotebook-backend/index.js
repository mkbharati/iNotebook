const connectToMongo = require('./db');
const express = require('express');
const app = express()
var cors = require('cors')
require("dotenv").config();
connectToMongo();
const port = 5000
app.use(cors())
app.use(express.json()) // to send req

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, ()=>{
    console.log(`We are connected to ${port}`);
})