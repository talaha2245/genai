import express from "express";
import type { Request, Response } from "express";
import { User } from "../Model/db.js";
import { verifyUserCookie } from "../Controller/helper.controller.js";
import { handleGetAllUsers, handleGetAllUsersId } from "../Controller/User.controller.js";
const UserRouter = express.Router()
UserRouter.get("/getAllusers",verifyUserCookie ,handleGetAllUsers)
UserRouter.get("/getAllusers:id",verifyUserCookie,handleGetAllUsersId)

export default UserRouter