import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ax from '../../utils/ax'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'

const Profile = () => {

    const {data, isLoading, error} = useQuery({
        queryKey : ["getProfile"],
        queryFn : async ()=>{
            const response = await ax.get('/profile')
            

            return response.data
        }
    })
  return (
    <div className='w-full h-full'>
        <h1>PROFIL</h1>
        <div>
            <img src={`http://localhost:3000/profile/${data?.imageProfile}`} alt=""  className='w-48 h-48'/>
            <h1>Username : {data?.username}</h1>
            <h1>Email : {data?.email}</h1>

            <NavLink to={"/profile/edit"}> <Button primary className='bg-green-700 text-white'>Edit</Button> </NavLink>

        </div>
    </div>
  )
}

export default Profile