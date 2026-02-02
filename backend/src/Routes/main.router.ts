import express from "express"
import AuthRouter from "./Auth.router.js"
import UserRouter from "./User.router.js"
import ConverstaionRouter from "./Conversation.router.js"

const MainRouter = express.Router()
MainRouter.use("/auth",AuthRouter)
MainRouter.use("/user",UserRouter)
MainRouter.use("/conversation",ConverstaionRouter)
export default MainRouter
