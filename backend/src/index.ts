import express from "express"
import type {Request , Response} from "express"
const app = express()

app.get("/",(req : Request ,res : Response)=>{
    return res.json({
        msg : " connected"
    })
})


app.listen(3000,()=>{
    console.log(" the app is running on the prot ")
})