import type { Response } from "express"
import type { userinfo } from "../types/interfaces.js"
import { Conversation, Message, User } from "../Model/db.js"
import { connectedUsers } from "../index.js"
const handleAllUserConversation = async (req: userinfo, res: Response) => {

    // waht it does we will fetch the user deatils 
    // on the bases on the user deatil we will fecth the convos made by user is involved 
    // by this we ill get the converstion 
    // on the bases of getting the co=nverstaion we willload the last message 
    // we can aslo get the messag id and all the messages also 
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
        // we will also return the converstions with the last messsages
        let data = await Conversation.find({
            participants: { $in: [userinfo._id] }
        })
        if (data.length == 0) {
            throw new Error(" there are no conversations")
        }
        // console.log("the last message id is " + data[0]?.lastMessage)
        // let ans = await Promise.all(
        //     data.map((item) => {
        //         return Message.find({ _id: item.lastMessage! }) // gets the last messge id of all convoserstions  
        //     })
        // )
        // if (ans.length == 0) {
        //     throw new Error(" there are no messages ")
        // }
        return res.status(200).json({
            msg: "successfully fetched the data of " + Currentuser,
            // lastMessages_info: ans,
            Allconvsersations: data
        })
    } catch (error: any) {
        console.log(" the error is " + error)
        return res.json({
            msg: "error occured",
            error: error.message
        })

    }
}

const handleCreteConversation = async (req: userinfo, res: Response) => {
    // our task is to crete a converation with user 
    // console.log("thie has been calleds")
    try {
        const senderUsername = req.username
        const receiverUsername = req.body.username
        const MessageSend = req.body.Message as string
        if (senderUsername == receiverUsername) {
            throw new Error(" you can't send the message")
        }
        if (senderUsername == null || receiverUsername == null || MessageSend == null) {
            throw new Error("You are not authorised")
        }
        // we need to creat a connection 
        // getting the id 
        const Sender = await User.findOne({
            username: senderUsername
        })
        const receiver = await User.findOne({
            username: receiverUsername
        })
        if (!Sender || !receiver) {
            throw new Error(" the user doesn't Exist ")
        }
        // we don't need to create conversion every time 
        // we only need to create a conversation if the conversation between two user doesn't exist 
        let conversationinfo = await Conversation.findOne({
            participants: { $all: [Sender._id, receiver._id] }
        })
        if (!conversationinfo) {
            conversationinfo = await Conversation.create({
                participants: [Sender._id, receiver._id],
            })
        }
        // now we will create a message 
        const MessageInfo = await Message.create({
            conversationId: conversationinfo._id,
            senderId: Sender._id,
            content: MessageSend
        })
        // now we need to update conversation
        await Conversation.findOneAndUpdate({ _id: conversationinfo._id }, {
            lastMessage: MessageInfo._id
        })
        // implemnting the websocket 
        console.log("the receiver id is " + receiver._id)
        const receiverWs = connectedUsers.get(receiver._id.toString())
        console.log(" the websocket is ", receiverWs)
        if (receiverWs) {

            console.log("request send to ", receiver.username)
            receiverWs.send(JSON.stringify(
                {
                    type: "new_message",
                    message: MessageInfo
                }
            ))
        }

        return res.status(201).json({
            msg: 'successfully send the chat '
        })

    } catch (error: any) {
        return res.status(401).json({
            msg: "please check the credentials ",
            Error: error.message
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
    // this is looking great now we need to differentiate who has sent the message and who has received the message 
    //
    try {
        const sender = req.username
        const receiver = req.params.id as string
        // getting the id 
        if (!sender || !receiver) {
            throw new Error("You are not authorised")
        }
        const sendInfo = await User.findOne({
            username: sender
        })
        const receiverInfo = await User.findOne({
            username: receiver
        })
        if (!sendInfo || !receiverInfo) {
            throw new Error("The user does not exist")
        }
        // this gives the convertion id 
        const ConversationInfo = await Conversation.findOne({
            participants: { $all: [sendInfo._id, receiverInfo._id] }
        })
        if (!ConversationInfo) {
            throw new Error("no conversation exist ")
        }

        // this is looking great no wee need to diffrenctaitaw who has sent the messge and who has recived the messge 
        //
        const data = await Message.find({
            conversationId: ConversationInfo._id
        }).sort({ createdAt: -1 }).limit(20)
        if (!data) {
            throw new Error("Unable to fetch messages")
        }
        return res.status(200).json({
            msg: "sending the messges",
            data
        })
    } catch (error: any) {
        console.log(error)
        return res.status(401).json({
            msg: "some error",
            Error: JSON.stringify(error.message)
        })
    }
}

const handleGetMessageByid = async (req: userinfo, res: Response) => {
    try {
        const Message_id = req.params.id as string
        const resp = await Message.findOne(({
            _id: Message_id
        }))
        if (!resp) {
            throw new Error("The messge is not found")
        }
        return res.json({
            msg: "successfully retrieved message data",
            Message_data: resp
        })
    } catch (error) {
        return res.json({
            msg: "Some error has occured ",
            Error: error
        })

    }
}

export {
    handleAllUserConversation,
    handleCreteConversation,
    handleGetAllConversationWithSpeficUser,
    handleGetMessageByid
}