import type { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken"
import type { JwtPayLoad } from "../types/interfaces.js";
export const verifyUserCookie = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["auth_token"];

    const data = jsonwebtoken.verify(token, process.env.JWT_screat!) as JwtPayLoad

    if(!data){
      return res.json({
        msg : " you are not authrised"
      })
    }
    req.username = data.username
    next()
  } catch (error) {
    return res.json({
      msg: "you are not authrised to enter 1"
    })
  }
}