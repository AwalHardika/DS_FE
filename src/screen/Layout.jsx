import { Menu } from 'antd'
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const Layout = () => {

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

        <div className='flex flex-1'>
            <Outlet/>
        </div>
    </main>
  )
}

export default Layout