import React, { useEffect, useState, useRef } from 'react'
import { useAtom } from 'jotai'
import { selectedUserAtom, baseUrlAtom, CurrentLoggedinUser, RefresherAtom, websocketAtom } from '@/store/user'
import axios from 'axios'
import { FaRegUserCircle, FaPaperPlane } from 'react-icons/fa'
import type { MessageType } from '@/types/type'

const ChatWithUser = () => {
  const [selectedUser] = useAtom(selectedUserAtom)
  const [baseUrl] = useAtom(baseUrlAtom)
  const [currentUser] = useAtom(CurrentLoggedinUser)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [Refresh, setRefresh] = useAtom(RefresherAtom)
  const [websocket] = useAtom(websocketAtom)

  useEffect(() => {
    if (!websocket) return;
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("websocket on front end is called ")

      if (data.type === "new_message" && data.message.conversationId === currentConversationId) {
        setMessages((prev) => [...prev, data.message]);
      }
    };

    return () => {
      websocket.onmessage = null;
    }

  }, [websocket, currentConversationId]);



  const fetchMessages = async () => {
    if (!selectedUser?.username) return
    setLoading(true)
    try {
      const res = await axios.get(`${baseUrl}/conversation/${selectedUser.username}`, { withCredentials: true })
      if (res.data.data) {
        const fetchedMessages = [...res.data.data].reverse();
        setMessages(fetchedMessages)
        if (fetchedMessages.length > 0) {
          setCurrentConversationId(fetchedMessages[0].conversationId)
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (e: any) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedUser?.username) return
    try {
      await axios.post(`${baseUrl}/conversation`, {
        username: selectedUser.username,
        Message: newMessage
      }, { withCredentials: true })

      setNewMessage('') // clearing the message 
      setRefresh((e) => e + 1)// Refresh messages after sending to go up and re-render 
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [selectedUser, baseUrl, Refresh])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  if (!selectedUser) return <div className=" flex-1 w-full h-full flex items-center justify-center text-gray-500">Select a user to start chatting</div>

  return (
    <div className="flex flex-col h-full bg-zinc-900 border-l border-zinc-800">
      <div className="flex items-center gap-3 p-4 border-b border-zinc-800 bg-zinc-950/50">
        <div className="text-gray-300 text-3xl">
          <FaRegUserCircle />
        </div>
        <h2 className="text-xl font-bold text-white">{selectedUser.username}</h2>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-hide"
      >
        {loading ? (
          <div className="flex justify-center items-center h-full text-zinc-500">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-zinc-500">No messages yet. Say hi!</div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.senderId === currentUser?._id
            return (
              <div
                key={index}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-2xl ${isMe
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-zinc-800 text-zinc-200 rounded-bl-none'
                    }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <span className="text-[10px] opacity-50 mt-1 block">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>
      <form
        onSubmit={handleSendMessage}
        className="p-4 bg-zinc-950/50 border-t border-zinc-800 flex gap-2"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-zinc-900 text-white border border-zinc-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition flex items-center justify-center min-w-10"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  )
}

export default ChatWithUser