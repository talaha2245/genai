import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import type { Request , Response } from "express";
import { User } from "../Model/db.js";
const handleUsersignup = async (req : Request, res : Response) => {
    const body = req.body;
    let response = await User.findOne({
        username: body.username
    });
    if (!response) {
        try {
            const hashedpassword = await bcrypt.hash(body.password, 10);
            response = await User.create({
                username: body.username,
                password: hashedpassword
            });
            return res.status(201).json({
                msg: "user created "
            });
        }
        catch (error) {
            console.log("Errro occured" + error);
            return res.status(400).json({
                msg: "an errro occured" + error
            });
        }
    }
    else {
        return res.status(409).json({
            msg: " user aldready exist"
        });
    }
};
const handleUserLogin = async (req : Request , res : Response) => {
    const body = req.body;
    // find the user exist 
    let response = await User.findOne({
        username: body.username
    });
    if (response) {
        const resp = await bcrypt.compare(body.password, response.password!);
        if (resp) {
            const Token = jsonwebtoken.sign({ username: body.username }, process.env.JWT_screat || "apple");
            res.cookie("auth_token", Token);
            return res.json({
                msg: " sucess user sucessflyy entere" + Token
            });
        }
    }
    return res.json({
        msg: "error occured in auth"
    });
};
const handleUserLogout = (req : Request, res : Response) => {
    res.clearCookie("auth_token");
    return res.json({
        msg: " sucesslfuy logged out"
    });
};
export { handleUserLogin, handleUserLogout, handleUsersignup };
