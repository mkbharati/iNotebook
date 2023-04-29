const mongoose = require("mongoose");

mongoURI = "mongodb://localhost:27017/?readPreference=primary&ssl=false&directConnection=true";

const connectToMongo = () =>{
    mongoose.connect(mongoURI,{
    }).then(()=>{
        console.log('Connected to mongo');
    }).catch(()=>{
        console.log('Not connected');
    })
}

module.exports = connectToMongo;