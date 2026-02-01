import { User } from "../Model/db.js"
import type { userinfo } from "../types/interfaces.js"
import type { Response } from "express"

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

const handleGetAllUsersId = async(req : userinfo, res : Response)=>{

}
export {
    handleGetAllUsers,
    handleGetAllUsersId
}