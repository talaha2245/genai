import mongoose from "mongoose";
// creteing teh schema 
mongoose.connect("mongodb://localhost:27017/").then(()=>{
    console.log(" connected sucessful ")
}).catch((err)=>{
    console.log(" and error has been occures")
})

