import { Button } from '@/components/ui/button'
import { useAtom } from 'jotai'
import { mainuserdata } from '@/store/user'
import { useEffect, useState } from 'react'
import axios from 'axios'

const HomePage = () => {
    const [user , _]  = useAtom(mainuserdata)
    const [conversation , setconversation] = useState({})

    const handlellingGettingData = async() =>{
        // this give use the converstion data + last messge attcahed to it 
        const data = await axios({
            method :"GET",
            url:"http://localhost:3001/api/v1/conversation"
        })
        setconversation(data)
    }



    useEffect(()=>{
        handlellingGettingData()
    },[])
  return (
    <div className='w-screen h-screen flex flex-col p-2'>
        <div className='flex items-center justify-between bg-gray-300 h-20 border-2 w-full rounded-2xl'>
            <div className='p-2 flex items-center gap-2' >
                <div className='rounded-full hover:border-2 border-green-100'>
                    <img src="/images/warren-VVEwJJRRHgk-unsplash.jpg" alt="profile image is not laded" className='w-16 h-16 rounded-full object-cover' />
                </div>
                <div className='font-bold text-xl'>
                    hey! {user.username}
                </div>
            </div>
            <div className='flex gap-6 mr-10'>
                <Button size={"lg"}> FInd Freinds</Button>
                <Button size={"lg"}>Logout </Button>
            </div>
        </div>
        <div className='w-full h-full bg-gray-600 mt-5 rounded-2xl flex p-5'>
            <div id='chats' className='h-full w-[40%] bg-green-400 flex flex-col items-center p-2'>
                <h1 className='scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance'>chats </h1>


            </div>

        </div>


    </div>
  )
}

export default HomePage