import type { Response } from "express"
import type { userinfo } from "../types/interfaces.js"
import { Conversation, User } from "../Model/db.js"
const handleAllUserConversation = async (req: userinfo, res: Response) => {
    try {
        const Currentuser = req.username
        if (!Currentuser) {
            return res.status(200).json({
                msg: "You are un athrised "
            })
        }
        const userinfo = await User.findOne({
            username: Currentuser
        })
        if (!userinfo) {
            throw new Error("You are not authroised")
        }
        // this return an arry of converation 
        const data = await Conversation.find({
            participants: { $in: [userinfo._id] }
        })
        if (!data) {
            throw new Error(" there are no conversations")
        }
        return res.status(200).json({
            msg: " all converation fatched",
            data
        })
    } catch (error) {
        console.log(" the error is " + Error)
        return res.json({
            msg: "error occured",
            error
        })

    }

}

const handleCreteConversation =  async (req: userinfo, res: Response) => {}


export {
    handleAllUserConversation,
    handleCreteConversation
}