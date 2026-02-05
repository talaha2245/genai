import { LoginForm } from '@/components/login-form'
import React from 'react'

const Login = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-300">
            <div className='w-[30%]'>
                <LoginForm></LoginForm>
            </div>
    </div>
  )
}

export default Login