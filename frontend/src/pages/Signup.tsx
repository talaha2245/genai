import { SignupForm } from '@/components/signup-form'
import React from 'react'

const Signup = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-300">
        <div className='w-[30%]'>
            <SignupForm></SignupForm>
        </div>
        </div>
  )
}

export default Signup