import type { Response } from "express"
import type { userinfo } from "../types/interfaces.js"
import { Conversation, Message, User } from "../Model/db.js"
const handleAllUserConversation = async (req: userinfo, res: Response) => {
    try {
        const Currentuser = req.username
        console.log("called 2")
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
        // we will also return the converstions with the last messsages
        let data = await Conversation.find({
            participants: { $in: [userinfo._id] }
        })
        if (data.length == 0 ) {
            console.log("hi 123")
            throw new Error(" there are no conversations")
        }
        let ans = await Promise.all(
            data.map((item)=>{
                console.log(item._id)
                return Message.find({conversationId : item._id})
            })
        )
        if(ans.length == 0){
            throw new Error(" there are no conversations")
        }
        console.log(ans)
        return res.status(200).json({
            msg: "All converstaion fetched talaha",
            ans,
            data

        })
    } catch (error : any) {
        console.log(" the error is " + error)
        return res.json({
            msg: "error occured",
            error : error.message
        })

    }

}

const handleCreteConversation = async (req: userinfo, res: Response) => {
    // our task is to crete a converation with user 
    try {
        console.log("this one called 1")
        const senderUsername = req.username
        const reciverUsername = req.body.username
        const MessageSend = req.body.Message as string
        if(senderUsername == reciverUsername){
            throw new Error(" you can't send the message")
        }
        if (senderUsername == null || reciverUsername == null || MessageSend == null) {
            throw new Error("You are not authorised")
        }
        // we need to creat a connection 
        // getting the id 
        const Sender = await User.findOne({
            username: senderUsername
        })
        const reciver = await User.findOne({
            username: reciverUsername
        })
        if (!Sender || !reciver) {
            throw new Error(" the user dosent Exist ")
        }
        // we dont need to cret convertion every tiem 
        // we only need to cretae a converation if the converstion between two user dosent exist 
        let conversationinfo = await Conversation.findOne({
            participants: { $all: [Sender._id, reciver._id] }
        })
        if (!conversationinfo) {
            conversationinfo = await Conversation.create({
                participants: [Sender._id, reciver._id],
            })
        }
        // now we will creta a message 
        const MessageId = await Message.create({
            conversationId: conversationinfo._id,
            senderId: Sender._id,
            content: MessageSend
        })
        // now we need to update converstuion
        await Conversation.findOneAndUpdate({ _id: conversationinfo._id }, {
            lastMessage: MessageId._id
        })
        return res.status(201).json({
            msg: 'sucessfullly send the chat '
        })

    } catch (error : any) {
        return res.status(401).json({
            msg: "please check the credinatals ",
            Error : error.message
        })

    }
}

const handleGetAllConversationWithSpeficUser = async (req: userinfo, res: Response) => {
    // like the agenda of this is to 
    // wee will give the all data the front end should manage the pagination part 
    // by cookie we will get the currnt loggedin userinfo 
    // by the url we will recive the senders info 
    // getting their id's and finding their chats 
    // getting the conversation 
    // we will only crete one conversation but there are multiple chats assotared with conversation 
    // if the converstaion is null so there is no converstion done yet 
    // 
    try {
        console.log("thi is called 3")
        const sender = req.username
        const reciver = req.params.id as string
        // getting the id 
        if (!sender || !reciver) {
            throw new Error("You are not authorised")
        }
        const sendInfo = await User.findOne({
            username: sender
        })
        const reciverInfo = await User.findOne({
            username: reciver
        })
        if (!sendInfo || !reciverInfo) {
            throw new Error("The user doses not exist")
        }
        // this gives the convertion id 
        const ConversationInfo = await Conversation.findOne({
            participants: { $all: [sendInfo._id, reciverInfo._id] }
        })
        if (!ConversationInfo) {
            throw new Error("no conversation exist ")
        }
        // finding the messages with 
        const data = await Message.find({
            conversationId: ConversationInfo._id
        }).sort({ createdAt: -1 }).limit(20)
        if (!data) {
            throw new Error("Unable to fetch messgaes")
        }
        return res.status(200).json({
            msg: "sending the messges",
            data
        })
    } catch (error : any) {
        console.log(error)
        return res.status(401).json({
            msg: "some error",
            Error : JSON.stringify(error.message)
        })
    }
}


export {
    handleAllUserConversation,
    handleCreteConversation,
    handleGetAllConversationWithSpeficUser
}