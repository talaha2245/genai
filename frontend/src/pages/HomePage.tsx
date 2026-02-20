import { Button } from '@/components/ui/button'
import { useAtom } from 'jotai'
import { CurrentLoggedinUser } from '@/store/user'
import type { ChatItem, ConversationResponseStructure } from '@/types/type'
import { useEffect, useState } from 'react'
import { baseUrlAtom } from '@/store/user'
import { FaRegUserCircle } from "react-icons/fa";



import axios from 'axios'


const HomePage = () => {
    const [user] = useAtom(CurrentLoggedinUser)
    const [loading, setloading] = useState(true)
    const [conversation, setconversation] = useState<ConversationResponseStructure[] | null>(null)
    const [baseurl] = useAtom(baseUrlAtom)
    const [chatMessage, setChatMessage] = useState<ChatItem[] | null>()

    useEffect(() => {
        let active = true
        void (async () => {
            try {
                const res = await axios({
                    method: "GET",
                    url: baseurl + "/conversation",
                    withCredentials: true
                })
                if (!active) return
                setconversation(res.data.Allconvsersations)
            } finally {
                if (active) setloading(false)
            }
        })()

        return () => {
            active = false
        }
    }, [baseurl])

    useEffect(() => {
        const fetchUserAndLastMessage = async () => {
            const result = await Promise.all(
                conversation!.map(async (item) => {
                    // find the other user
                    const anotherUserId =
                        item.participants[0] === user?._id
                            ? item.participants[1]
                            : item.participants[0];

                    // fetch friend details
                    const friendRes = await axios.get(
                        `${baseurl}/user/me/${anotherUserId}`,
                        { withCredentials: true }
                    );

                    // fetch last message
                    const msgRes = await axios.get(
                        `${baseurl}/conversation/message/${item.lastMessage}`,
                        { withCredentials: true }

                    );

                    return {
                        friendDetails: friendRes.data.userdata,
                        lastMessage: msgRes.data.Message_data,
                    };
                })
            );

            // TODO: store in state →
            // setSidebarData(result)
            console.log("FINAL RESULT", result);
            setChatMessage(result);
        };

        if (conversation && conversation?.length > 0) {
            fetchUserAndLastMessage();

        }
    }, [conversation]);
    if (loading) {
        return <><div>Loading</div></>
    }
    return (
        <div className='w-screen h-screen flex flex-col p-2'>
            <div className='flex items-center justify-between bg-gray-300 h-20 border-2 w-full rounded-2xl'>
                <div className='p-2 flex items-center gap-2' >
                    <div className='rounded-full hover:border-2 border-green-100'>
                        <img src="/images/warren-VVEwJJRRHgk-unsplash.jpg" alt="profile image is not laded" className='w-16 h-16 rounded-full object-cover' />
                    </div>
                    <div className='font-bold text-xl'>
                        hey! {user?.username}
                    </div>
                </div>
                <div className='flex gap-6 mr-10'>
                    <Button size={"lg"}> FInd Freinds</Button>
                    <Button size={"lg"}>Logout </Button>
                </div>
            </div>
            <div className='w-full h-full bg-gray-600 mt-5 rounded-2xl flex p-5'>
                <div id='chats' className='h-full w-[40%] bg-black flex flex-col items-center gap-3'>
                    <h1 className='scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance'>chats </h1>
                    <div id='Rendering chats ' className='flex flex-col w-full items-center gap-2'>
                        {conversation && conversation.length > 0 ? (
                            chatMessage?.map((item) => (
                                <div
                                    // key={item._id}
                                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-800 rounded-xl cursor-pointer transition"
                                >
                                    {/* Profile Icon */}
                                    <div className="text-gray-300 text-4xl">
                                        <FaRegUserCircle />
                                    </div>

                                    {/* Text Section */}
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

            </div>

        </div>
    )
}

export default HomePage