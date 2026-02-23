import { Button } from '@/components/ui/button'
import { baseUrlAtom } from '@/store/user'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { CurrentLoggedinUser } from '@/store/user'
import { useNavigate } from 'react-router-dom'


const FindFriends = () => {
    const [NewFriends, setNewFriends] = useState<any[]>([])
    const [baseUrl] = useAtom(baseUrlAtom)
    const [refresh, setRefresh] = useState(0)
    const [selectedFriend, setSelectedFriend] = useState<any>(null)
    const [currentuser] = useAtom(CurrentLoggedinUser)

    const Navigate = useNavigate()

    const fetchAllData = async () => {
        try {
            //  Fetch all users from the db 
            const usersResp = await axios.get(`${baseUrl}/user`, { withCredentials: true })
            const allUsersFromDb = usersResp.data.data

            // Fetch all conversations from the datali to find all the converstions 
            const convoResp = await axios.get(`${baseUrl}/conversation`, { withCredentials: true })
            const existingConvos = convoResp.data.Allconvsersations || []

            const existingFriendIds = new Set()
            existingConvos.forEach((convo: any) => {
                if (convo.participants[0] != currentuser?._id){
                    existingFriendIds.add(convo.participants[0])
                }
                if (convo.participants[1] != currentuser?._id){
                    existingFriendIds.add(convo.participants[1])
                }
            })

            // get all teh user 
            const filtered = allUsersFromDb.filter((user: any) => {
                const isMe = user.username === currentuser?.username // Backend might return username or ID, handle cautiously
                // handleGetAllUsers returns { _id, username, image }
                const isFriend = existingFriendIds.has(user._id)
                return !isMe && !isFriend
            })

            setNewFriends(filtered)

            // if freinds exist we will cret a random choice 
            if (filtered.length > 0) {
                const randomChoice = Math.floor(Math.random() * filtered.length)
                setSelectedFriend(filtered[randomChoice])
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const fetchRandomUser = () => {
        if (NewFriends.length > 0) {
            const randomChoice = Math.floor(Math.random() * NewFriends.length)
            setSelectedFriend(NewFriends[randomChoice])
        }
    }

    const handleChat = async () => {
        if (!selectedFriend) return
        try {
            await axios.post(`${baseUrl}/conversation`, {
                username: selectedFriend.username,
                Message: `Hey ${selectedFriend.username}, I found you on Find Friends lets Talak !`
            }, { withCredentials: true })
            alert(`Conversation started with ${selectedFriend.username}!`)
            Navigate("/Home")
            
        } catch (error) {
            console.error("Error creating conversation:", error)
        }
    }

    useEffect(() => {
        if (currentuser) {
            fetchAllData()
        }
    }, [currentuser])

    useEffect(() => {
        if (refresh > 0) {
            fetchRandomUser()
        }
    }, [refresh])

    return (
        <div className='w-screen h-screen p-2 flex flex-col items-center gap-4 bg-zinc-950'>
            <h1 className='font-extrabold text-2xl shadow-2xl mt-10 text-gray-500'>Find Friends</h1>

            <div className='w-full h-[70%] flex gap-2'>
                <div className='w-[50%] h-full bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-4'>
                    <img
                        src={currentuser?.image || "/images/warren-VVEwJJRRHgk-unsplash.jpg"}
                        alt="My Profile"
                        className='w-40 h-40 rounded-full object-cover mb-4 border-4 border-zinc-700'
                    />
                    <h1 className='font-extrabold text-gray-300 text-xl'>{currentuser?.username} (You)</h1>
                </div>

                <div className='w-[50%] h-full bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-4'>
                    {selectedFriend ? (
                        <>
                            <img
                                src={selectedFriend.image || "/images/warren-VVEwJJRRHgk-unsplash.jpg"}
                                alt="Potential Friend"
                                className='w-40 h-40 rounded-full object-cover mb-4 border-4 border-zinc-700'
                            />
                            <h1 className='font-extrabold text-gray-300 text-xl'>{selectedFriend.username}</h1>
                        </>
                    ) : (
                        <h1 className='text-gray-500'>No new friends found... try again later!</h1>
                    )}
                </div>
            </div>

            <div className='flex gap-2 mt-10'>
                <Button
                    className='w-40 drop-shadow-2xl hover:border-2 hover:border-amber-50 py-4'
                    onClick={() => setRefresh(prev => prev + 1)}
                >
                    Refresh
                </Button>
                <Button
                    disabled={!selectedFriend}
                    className='w-40 drop-shadow-2xl hover:border-2 hover:border-amber-50 py-4'
                    onClick={handleChat}
                >
                    Chat
                </Button>
            </div>
        </div>
    )
}

export default FindFriends