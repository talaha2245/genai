import express from "express"
import AuthRouter from "./Auth.router.js"
import UserRouter from "./User.router.js"

const MainRouter = express.Router()
MainRouter.use("/auth",AuthRouter)
MainRouter.use("/user",UserRouter)
export default MainRouter
