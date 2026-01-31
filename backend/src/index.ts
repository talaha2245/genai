import express from "express"
import dotenv from "dotenv"
import MainRouter from "./Routes/main.js"


dotenv.config()
const app = express()
app.use(express.json())

// routes 
app.use("/api/v1",MainRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT ,()=>{
    console.log(" the app is running on the prot " + PORT)
})