import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import Layout from './screen/Layout'
import DashboardScreen from './screen/dashboard/DashboardScreen'
import ProductScreen from './screen/product/ProductScreen'

const App = () => {
  const [isLogin, setIsLogin] = useState(false)
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token) {
      setIsLogin(true)
    }
  }, [])

  function onLogin() {
    setIsLogin(true)
  }

  if(!isLogin){
    return (
    <Routes>
      <Route path='/' element={<Login onLogin={onLogin}/>}/>
      <Route path='/register' element={<Register/>} />
    </Routes>
    )
  }



  return(
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<DashboardScreen/>} />
        <Route path='/product'element={<ProductScreen/>} />
      </Route>
    </Routes>
  )
}

export default App