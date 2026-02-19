export type UserDocument = {
  _id: string
  username: string
  password: string
  __v: number
}

export type ConversationResponseStructure = {
    _id : string,
    participants : string[],
    isGroup : boolean,
    lastMessage : string,
    createdAt : string,
    updatedAt : string,
    __v : number
}

export type MessageType = {
    conversationId : string,
    senderId : string,
    content : string,
    createdAt : string,
    updatedAt : string,
}