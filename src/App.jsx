import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'

const App = () => {
  const [isLogin, setIsLogin] = useState(false)
  if(!isLogin){
    return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>} />
    </Routes>
    )
  }
}

export default App