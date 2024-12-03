import { useQuery } from '@tanstack/react-query'
import { Button, Form, Image, Input, Upload } from 'antd'
import React, { useState } from 'react'
import ax from '../../utils/ax'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {

    const [imageBase64, setImageBase64] = useState(null)
    const navigate = useNavigate()
    
    const {data, isLoading, error, refetch} = useQuery({
        queryKey : ["getProfile"],
        queryFn : async ()=>{
          const response = await ax.get('/profile')
          return response.data
      }
    })
    
    if(isLoading) return <p>Loading...</p>

    let previewImage = imageBase64 ? imageBase64 : `http://localhost:3000/profile/${data?.imageProfile}?t=${Date.now()}`

    function handleImageChange({ file }) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file.originFileObj);
    }

    function handleUpdateProfile(e){
      let data = {
        ...e,
        imageProfile : imageBase64
      }

      ax.put("/user/update", data)
      .then(res=>{
        refetch()
        alert("Data Berhasil di update")   
        navigate(-1)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  return (
    <div>
        <h1>Edit Profile</h1>
        <Form
        layout='vertical'
        className='w-[400px]'
        onFinish={handleUpdateProfile}
        >
          
            <Form.Item
            name={"username"}
            label={"Username"}
            initialValue={data?.username}
            >
              <Input/>
            </Form.Item>

            <Form.Item
            name={"email"}
            label={"Email"}
            initialValue={data?.email}
            >
              <Input/>
            </Form.Item>

            <Form.Item
            label={"Image Profile"}
            className='w-[200px] h-[200px]'
            >
              <Image src={previewImage}  />
              <Upload
              showUploadList={false}
              onChange={handleImageChange}
              maxCount={1}
              >
                <Button>Upload</Button>
              </Upload>
            </Form.Item>
            
            <Button htmlType='submit' type='primary'>Submit</Button>



        </Form>
    </div>
  )
}

export default EditProfile