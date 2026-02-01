import express from "express";
import type { Request, Response } from "express";
import { User } from "../Model/db.js";
import { verifyUserCookie } from "../Controller/helper.controller.js";
import { handleEditUser, handleGetAllUsers, handleGetAllUsersId, handleGetMe } from "../Controller/User.controller.js";
import type { userinfo } from "../types/interfaces.js";
const UserRouter = express.Router()
UserRouter.get("/",verifyUserCookie ,handleGetAllUsers)
UserRouter.get("/:name",verifyUserCookie,handleGetAllUsersId)
UserRouter.put("/me",verifyUserCookie ,handleEditUser )
UserRouter.get("/me",verifyUserCookie, handleGetMe)
export default UserRouter