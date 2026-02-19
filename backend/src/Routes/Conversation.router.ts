import express from "express"
import { handleAllUserConversation, handleCreteConversation, handleGetAllConversationWithSpeficUser, handleGetMessageByid } from "../Controller/Conversation.controller.js"
import { verifyUserCookie } from "../Controller/helper.controller.js"
const ConverstaionRouter = express.Router()


// get all converation of user 
// and the last messge id 
ConverstaionRouter.get("/",verifyUserCookie,handleAllUserConversation)

//this is used to crete a new conversation for the user 
ConverstaionRouter.post("/",verifyUserCookie, handleCreteConversation)

// // getting the conversation with spefic user 
ConverstaionRouter.get("/:id",verifyUserCookie,handleGetAllConversationWithSpeficUser)


// we will crete a route it take the message id and retuns the message
// working fine 
ConverstaionRouter.get("/message/:id" , verifyUserCookie , handleGetMessageByid)

export default ConverstaionRouter;