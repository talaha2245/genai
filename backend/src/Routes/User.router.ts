import express from "express";
import { verifyUserCookie } from "../Controller/helper.controller.js";
import { handleEditUser, handleGetAllUsers, handleGetAllUsersId, handleGetMe } from "../Controller/User.controller.js";
const UserRouter = express.Router()
UserRouter.get("/",verifyUserCookie ,handleGetAllUsers)
UserRouter.get("/:name",verifyUserCookie,handleGetAllUsersId)
UserRouter.put("/me",verifyUserCookie ,handleEditUser )
UserRouter.get("/me",verifyUserCookie, handleGetMe)
export default UserRouter