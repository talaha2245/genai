import './App.css'
import HomePage from './pages/HomePage'
import Login from './pages/Login'

import { Route, Routes } from "react-router-dom"
import Signup from './pages/Signup'
import FindFriends from './pages/FindFriends'


function App() {
  return <>
    <Routes >
      <Route element={<HomePage></HomePage>} path='/Home' />
      <Route element={<Login></Login>} path='/login' />
      <Route element={<Login></Login>} path='/' />
      <Route element={<FindFriends></FindFriends>} path='/find' />
      <Route element={<Signup></Signup>} path="/singup" />

    </Routes>

  </>
}

export default App
