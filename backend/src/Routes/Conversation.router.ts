import express from "express"
import { handleAllUserConversation, handleCreteConversation, handleGetAllConversationWithSpeficUser } from "../Controller/Conversation.controller.js"
import { verifyUserCookie } from "../Controller/helper.controller.js"
const ConverstaionRouter = express.Router()


// get all converation of user 
ConverstaionRouter.get("/",verifyUserCookie,handleAllUserConversation)

//this is used to crete a new conversation for the user 
ConverstaionRouter.post("/",verifyUserCookie, handleCreteConversation)

// getting the conversation with spefic user 
ConverstaionRouter.get("/:id",verifyUserCookie,handleGetAllConversationWithSpeficUser)

export default ConverstaionRouter;