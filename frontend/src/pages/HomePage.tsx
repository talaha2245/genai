import { Button } from '@/components/ui/button'
import { useAtom } from 'jotai'
import { mainuserdata } from '@/store/user'
import profileimage from "../assets/images/warren-VVEwJJRRHgk-unsplash.jpg"

const HomePage = () => {
    const [user , _] = useAtom(mainuserdata)
  return (
    <div className='w-screen h-screen flex flex-col'>
        <div className='flex items-center justify-between bg-gray-300 h-20 border-2 w-full'>
            <div className='p-2 flex items-center gap-2' >
                <div className='rounded-full hover:border-2 border-green-100'>
    
                    <img src={profileimage} alt="profile image is not laded" className='w-16 h-16 rounded-full object-cover' />
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

    </div>
  )
}

export default HomePage