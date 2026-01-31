import express from "express"
import AuthRouter from "./Auth.js"

const MainRouter = express.Router()
MainRouter.use("/auth",AuthRouter)
export default MainRouter
