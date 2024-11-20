import { useQuery } from '@tanstack/react-query'
import { Menu } from 'antd'
import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import ax from '../utils/ax'

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
        {
            key : "/logout",
            label : "Logout",
            onClick : ()=>{
                localStorage.removeItem("token")
                navigate("/")
                window.location.reload()
            }
        }
    ]

    const h_items = [
        {
            label : email ? email : "Unknown@gmail.com",
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

    const {data, isLoading, error} = useQuery({
        queryKey : ["getEmail"],
        queryFn : async ()=>{
            try {
                const response = await ax.get("/profile")
                setEmail(response.data.email)
                return response.data
            } catch (error) {
                console.log(error)
            }
        }
    })


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