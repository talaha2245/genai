import { Button } from '@/components/ui/button'
import { useAtom } from 'jotai'
import { CurrentLoggedinUser } from '@/store/user'
import type { ConversationResponseStructure } from '@/types/type'
import { useEffect, useState } from 'react'
import { baseUrlAtom } from '@/store/user'



import axios from 'axios'

const HomePage = () => {
    const [user] = useAtom(CurrentLoggedinUser)
    const [loading, setloading] = useState(true)
    const [conversation, setconversation] = useState<ConversationResponseStructure[] | null>(null)
    const [baseurl] = useAtom(baseUrlAtom)

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
                <div id='chats' className='h-full w-[40%] bg-green-400 flex flex-col items-center gap-3'>
                    <h1 className='scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance'>chats </h1>
                    <div id='Rendering chats ' className='flex flex-col w-full items-center gap-3'>
                        {conversation && conversation.length > 0 ? (
                            conversation.map((item) => (
                                <div
                                    key={item._id}
                                    className='w-[95%] bg-green-200 font-bold rounded-xl p-4 flex flex-col hover:bg-green-300 transition-all cursor-pointer'
                                >
                                    <div className='text-sm text-gray-800'>
                                        participants: {item.participants.join(', ')}
                                    </div>
                                    <div className='text-xs text-gray-700'>
                                        lastMessage: {item.lastMessage}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='text-sm text-gray-900'>No conversations yet.</div>
                        )}
                        {/* we will collect all the conversation on the basis connection request 
                    and we will fecth cthe last messge of teh conversation 
                    we wll render the username oin the based on the messge created  */}
                        {/* {conversation && conversation.length > 0 && conversation.map((item) => {
                            let anotheruserdata;
                            if (item.participants[0] == user?._id) {
                                anotheruserdata = handlegettingAnotheruserData(item.participants[1])
                            }
                            else {
                                anotheruserdata = handlegettingAnotheruserData(item.participants[0])
                            }
                            const lastMessage = handleLastMessge(item.lastMessage)
                            // console.log("entrered" + item.createdAt)
                            console.log(anotheruserdata)
                            console.log(lastMessage)
                            return (
                                <div>Hi </div>
                                // <div className='w-[95%] bg-green-200 font-bold rounded-xl p-4 flex justify-between items-center hover:bg-green-300 transition-all cursor-pointer'>

                                //     <div className='flex flex-col'>
                                //         <span className='text-lg'>
                                //             {anotheruserdata?.username}
                                //         </span>
                                //         <span className='text-sm font-normal text-gray-700 truncate max-w-[200px]'>
                                //             {lastMessage?.content}
                                //         </span>
                                //     </div>

                                //     <div className='text-xs font-normal text-gray-600'>
                                //         {lastMessage?.createdAt}
                                //     </div>

                                // </div>
                            )
                        })} */}

                    </div>
                </div>

            </div>

        </div>
    )
}

export default HomePage