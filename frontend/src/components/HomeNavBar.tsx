import React from 'react'
import { Button } from './ui/button'
import { CurrentLoggedinUser } from '@/store/user'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'

const HomeNavBar = () => {
    const navigate = useNavigate()
    const [user , SetCurrentUser] = useAtom(CurrentLoggedinUser)
  return (
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
                    <Button size={"lg"} onClick={(e)=>{
                    }}> Find Freinds</Button>
                    <Button size={"lg"} onClick={(e)=>{
                        navigate("/")
                    }}>Logout </Button>
                </div>
            </div>
  )
}

export default HomeNavBar