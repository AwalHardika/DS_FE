import { Button, Form, Input } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Login = () => {
  return (
    <div className='w-screnn h-screen flex justify-center items-center'>
        <Form
        autoComplete='off'
        className='w-[400px] h-auto p-4 border border-slate-400 rounded-md bg-white'
        layout='vertical'
        >
            <h1 className='text-blue-600 font-bold text-center mb-6'>FORM LOGIN</h1>
        <Form.Item 
        label  = "Email :"
        name={"email"}
        rules={[
            {
                required : true,
                message : "Please Input your email !"
            },
        ]}
        > 
        <Input />
        </Form.Item>
        
        <Form.Item 
        label  = "Password :"
        name={"password"}
        rules={[
            {
                required : true,
                message : "Please Input Your Password"
            }
        ]}
        > 
        <Input.Password/>
        </Form.Item>    

        <NavLink to={"/register"}><h1 className='text-blue-600 mb-4'>Don't have account ? sign up here</h1></NavLink>
        <Button
        htmlType='submit' type='primary' className='w-full'
        >
            Submit
        </Button>


        </Form>
    </div>
  )
}

export default Login