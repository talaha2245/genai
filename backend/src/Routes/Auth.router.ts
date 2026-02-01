import express from "express"
import { handleUserLogin, handleUserLogout, handleUsersignup } from "../Controller/Auth.controller.js"

const AuthRouter = express.Router()
// login 
// singup 
// 

interface user1 {
    username : string ,
    password : string
}
AuthRouter.post("/signup",handleUsersignup)

AuthRouter.post("/login",handleUserLogin)

AuthRouter.get("/logout",handleUserLogout)

export default AuthRouter