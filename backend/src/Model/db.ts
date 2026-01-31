import mongoose from "mongoose";
// creteing teh schema 
mongoose.connect(process.env.Connection_string || "mongodb://localhost:27017/").then(()=>{
    console.log(" connected sucessful ")
}).catch((err)=>{
    console.log(" and error has been occures")
})

const Userschema = new mongoose.Schema({
    username : {
        type : String,
        require: true
    },
    password : {
        type : String,
        require : true
    }
})

export const User = mongoose.model("user",Userschema)

