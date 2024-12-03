import { useQuery } from '@tanstack/react-query'
import { Avatar, Menu } from 'antd'
import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import ax from '../utils/ax'
import getProfile from '../api/profile/getProfile'

const Layout = () => {

    const [email, setEmail] = useState(null)

    const items = [
        {
            key : "/",
            label : "Dashboard"
        },
        {
            key : "/product",
            label : "Product"
        },
    ]
    const {data : Profil} = useQuery({
      queryKey : ["getProfile"],  
      queryFn : getProfile
    })

    
    const h_items = [
        {
            label : (
                Profil?.imageProfile ? (
                    <div className='flex gap-2 items-center'>
                    <Avatar src={`http://localhost:3000/profile/${Profil?.imageProfile}`} />
                    <h1>{Profil?.email}</h1>
                    </div>
                    
                ) : (
                    <Avatar>U</Avatar> // Avatar default
                )
            ),
            children : [
                {
                    label : "Profile",
                    key : "/profile"
                },
                {
                    label : "Logout",
                    onClick : ()=>{
                        localStorage.removeItem("token")
                        navigate("/")
                        window.location.reload()
                    }
                }
            ]
        }
    ]
    const navigate = useNavigate()
    const location = useLocation()
  return (
    <main className='w-screnn min-h-screen flex'>
        {/* left sidebar  */}
        <div className='w-[200px] h-screen'>
            <Menu 
            items={items}
            selectedKeys={[location.pathname]}
            onClick={(e)=>navigate(e.key)}
            
            />
        </div>

        {/* right content */}

        <div className='w-full flex flex-col flex-1'>
            <Menu 
            items={h_items}
            onClick={(e)=>navigate(e.key)}
            className='w-full flex justify-end'
            mode='horizontal'
            />
            <Outlet/>
        </div>
    </main>
  )
}

export default Layout