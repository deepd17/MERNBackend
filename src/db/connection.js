const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/example").then(()=>{
    console.log("Connection is created Successfully");
}).catch((e)=>{
    console.log("Connection is not created");
})