import mongoose from "mongoose";
// creteing teh schema 
mongoose.connect(process.env.Connection_string || "mongodb://localhost:27017/").then(() => {
    console.log(" connected sucessful ")
}).catch((err) => {
    console.log(" and error has been occures")
})

const Userschema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const MessageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
);


const ConversationSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        ],
        isGroup: {
            type: Boolean,
            default: false
        },
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: null
        }
    },
    { timestamps: true }
);

const User = mongoose.model("user", Userschema)
const Message = mongoose.model("Message" , MessageSchema)
const Conversation = mongoose.model("Conversation" , ConversationSchema)

export{
    User,
    Message,
    Conversation
}

