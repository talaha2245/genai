import { useAtom } from 'jotai'
import { selectedUserAtom, openChatAtom, baseUrlAtom } from '@/store/user'
import { FaRegUserCircle, FaComments } from 'react-icons/fa'
import ChatWithUser from './ChatWithUser'
import { useEffect } from 'react';
import axios from 'axios';

type HomeChatProps = {
    conversation: any;
    chatMessage: any;
};

const HomeChats = ({ conversation, chatMessage  }: HomeChatProps) => {
    const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)
    const [openChat, setOpenChat] = useAtom(openChatAtom)
    // lets handle refresh 
    return (
        <div className='w-full h-full bg-gray-600 mt-5 rounded-2xl flex p-5 gap-5 overflow-hidden'>
            <div id='chats' className='h-full w-[40%] bg-black flex flex-col gap-3 rounded-xl overflow-hidden border border-zinc-800'>
                <div className='w-full p-4 border-b border-zinc-800 bg-zinc-950/50 flex items-center gap-3'>
                    <FaComments className='text-blue-500 text-2xl' />
                    <h1 className='text-xl font-bold tracking-tight text-white'>All Messages</h1>
                    <span className='ml-auto bg-zinc-800 text-zinc-400 text-xs px-2 py-1 rounded-full'>
                        {chatMessage?.length  || 0}
                    </span>
                </div>
                <div id='Rendering chats ' className='flex flex-col w-full items-center gap-2 overflow-y-auto p-2 scrollbar-hide'>
                    {conversation && conversation.length > 0 ? (
                        chatMessage?.map((item: any, index: any) => (
                            <div
                                key={index}
                                className={`w-full flex items-center gap-3 p-3 hover:bg-gray-800 rounded-xl cursor-pointer transition ${selectedUser?._id === item.friendDetails._id ? 'bg-gray-600' : ''}`}
                                onClick={() => {
                                    console.log(item.friendDetails._id)
                                    setSelectedUser(item.friendDetails)
                                    setOpenChat(true)
                                }}
                            >
                                <div className="text-gray-300 text-4xl shrink-0">
                                    <FaRegUserCircle />
                                </div>
                                <div className="flex flex-col w-full overflow-hidden">
                                    <p className="font-semibold text-white truncate">
                                        {item.friendDetails.username}
                                    </p>

                                    {item.lastMessage?.content && (
                                        <p className="text-gray-400 text-sm truncate">
                                            {item.lastMessage.content}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center mt-5">No conversations found</p>
                    )}
                </div>
            </div>

            <div className='flex-1 h-full bg-black rounded-xl overflow-hidden'>
                {openChat ? (
                    <ChatWithUser />
                ) : (
                    <div className='w-full h-full flex flex-col items-center justify-center text-gray-400 gap-4'>
                        <FaRegUserCircle className='text-6xl opacity-20' />
                        <p className='text-xl font-semibold'>Select a user to start chatting</p>
                    </div>
                )}
            </div>

        </div>
    )
}

export default HomeChats