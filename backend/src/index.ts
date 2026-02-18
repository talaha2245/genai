import express from "express"
import dotenv from "dotenv"
import cookieparser from "cookie-parser"
import cors from "cors"

import MainRouter from "./Routes/main.router.js"


dotenv.config()
const app = express()
app.use(cors({
    origin : ["http://localhost:5173"],
    credentials : true
}))



app.use(express.json())
app.use(cookieparser())

// routes 
app.use("/api/v1",MainRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT ,()=>{
    console.log(" the app is running on the prot " + PORT)
})