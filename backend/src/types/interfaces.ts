import type { Request , Response } from "express";
export interface userinfo extends Request{
    username?: string
}
export interface JwtPayLoad{
    id:string,
    username : string
}