import { useQuery } from '@tanstack/react-query'
import { Form, Input } from 'antd'
import React, { useState } from 'react'

const EditProfile = () => {
    
    const {data, isLoading, error} = useQuery({
        queryKey : ["getProfile"]
    })
    
  return (
    <div>
        <h1>Edit Profile</h1>
        <Form
        layout='vertical'
        className='w-[400px]'
        >
            <Form.Item
            name={"username"}
            label={"Username"}
            initialValue={data?.username}
            >
               <Input/>
            </Form.Item>
        </Form>
    </div>
  )
}

export default EditProfile