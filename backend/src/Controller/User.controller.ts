import { User } from "../Model/db.js"
import type { userinfo } from "../types/interfaces.js"
import type { Response } from "express"
import jsonwebtoken  from "jsonwebtoken"

const handleGetAllUsers = async (req: userinfo, res: Response) => {
    try {
        const username = req.username
        const response = await User.find({})
        if (!response) {
            return res.status(200).json({
                msg: " no users found"
            })
        }
        const data = response.filter((item) => {
            if (item.username != username) {
                return true
            }
            return false
        }).map((items) => {
            return items.username
        })
        return res.status(200).json({
            msg: "sucessfull",
            data
        })

    } catch (error) {
        console.log("an error occured" + error)
        return res.status(201).json({
            msg: " error occures",
            error
        })

    }
}

const handleGetAllUsersId = async (req: userinfo, res: Response) => {
    const username = req.username
    const id = req.params.name as string
    try {
        const response = await User.find({})
        const data = response.filter((item) => {
            if (item.username?.toLowerCase().includes(id) && item.username != username) {
                return true
            }
            else {
                return false
            }
        }).map((items) => {
            return items.username
        })
        return res.status(200).json({
            msg: "the users",
            data
        })
    } catch (error) {
        console.log(" the errro is " + error)
        return res.json({
            msg: " some bs error occured",
            error
        })
    }


}

const handleEditUser = async (req: userinfo, res: Response) => {
    try {
        const currentusername = req.username
        const body = req.body
        // find and update 
        if (!currentusername) {
            return res.json({
                msg: "You are not Authroised"
            })
        }
        const response = await User.findOneAndUpdate({
            username: currentusername
        }, {
            username: body.username
        },{ new: true })
        // gerate the cookie again 
        const token = jsonwebtoken.sign({username : body.username},process.env.JWT_screat!)
        res.cookie("auth_token",token)
        return res.status(200).json({
            msg: "Sucessfully edited"
        })
    } catch (error) {
        console.log("some error occures" + error)
        return res.json({
            msg: " and error ",
            error
        })
    }

}

const handleGetMe = async (req : userinfo, res : Response)=>{    
    const currentusername = req.username
    if(!currentusername){
        return res.json({
            msg : "user not exist"
        })
    }
    const data = await User.findOne({
        username : currentusername
    })
    if(!data){
        return res.json({
            msg : " counld not find the user"
        })
    }
    return res.json({
        msg : "the user is",
        data
    })

}


const handleGetSpficUserdata = async (req : userinfo, res : Response)=>{
    // console.log("thi is being called")
    const userid = req.params.id as string
    try {
        if(!userid){
            throw new Error("the user dosent exist")
        }
        const userdata = await User.findOne({
            _id : userid
        })
        if(!userdata){
            throw new Error("The user dosnet enxist")
        }
        return res.json({
            msg : "The User data is ",
            userdata
        })
    } catch (error) {
        return res.json({
            msg : "the error occured",
            error
        })
    }

}




export {
    handleGetAllUsers,
    handleGetAllUsersId,
    handleEditUser,
    handleGetMe,
    handleGetSpficUserdata
}