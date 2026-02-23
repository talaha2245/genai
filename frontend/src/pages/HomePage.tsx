import { useAtom } from 'jotai'
import { CurrentLoggedinUser, RefresherAtom, websocketAtom, baseUrlAtom } from '@/store/user'
import type { ChatItem, ConversationResponseStructure } from '@/types/type'
import { useEffect, useState } from 'react'




import axios from 'axios'

import HomeNavBar from '@/components/HomeNavBar'
import HomeChats from '@/components/HomeChats'

const HomePage = () => {
    const [user, setCurrentUser] = useAtom(CurrentLoggedinUser)
    const [loading, setloading] = useState(true)
    const [conversation, setconversation] = useState<ConversationResponseStructure[] | null>(null)
    const [baseurl] = useAtom(baseUrlAtom)
    const [Refresh] = useAtom(RefresherAtom)
    const [chatMessage, setChatMessage] = useState<ChatItem[] | null>()
    const [websocket, setwebsocket] = useAtom(websocketAtom)


    const handleRefresh = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: `${baseurl}/user/me`,
                withCredentials: true
            })
            setCurrentUser(response.data.data)
        } catch (error) {
            console.log("some error has occurred" + error)
        }

    }


    const gettingAllConversations = () => {
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

    }
    const fetchUserAndLastMessage = async () => {
        const result = await Promise.all(
            conversation!.map(async (item) => {
                // find the other user who involved in conversation 
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

                // object of friend involved in conversation and last message 
                return {
                    friendDetails: friendRes.data.userdata,
                    lastMessage: msgRes.data.Message_data,
                };
            })
        );

        // TODO: store in state →
        // setSidebarData(result)
        // sort the data on the basis of time 
        result.sort(
            (a, b) =>
                new Date(b.lastMessage.createdAt).getTime() -
                new Date(a.lastMessage.createdAt).getTime()
        );
        console.log("FINAL RESULT", result);
        setChatMessage(result);
    };


    useEffect(() => {
        gettingAllConversations()
    }, [baseurl, Refresh, user])

    useEffect(() => {

        if (conversation && conversation?.length > 0) {
            // if conversation exist fetch the conversations
            fetchUserAndLastMessage();

        }
    }, [conversation, Refresh, user]);

    useEffect(() => {
        handleRefresh()
    }, [])

    useEffect(() => {
        if (user && !websocket) {
            try {
                const ws = new WebSocket(`ws://localhost:3001?userId=${user._id}`)
                setwebsocket(ws)
            } catch (error) {
                console.error("Error creating WebSocket:", error)
            }
        }
    }, [user, websocket, setwebsocket])

    if (loading) {
        return <><div>Loading</div></>
    }
    return (
        <div className='w-screen h-screen flex flex-col p-2 overflow-hidden'>
            <HomeNavBar></HomeNavBar>
            <HomeChats conversation={conversation} chatMessage={chatMessage} ></HomeChats>
        </div>
    )
}

export default HomePage