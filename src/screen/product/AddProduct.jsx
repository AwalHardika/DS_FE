import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input, Upload, message } from 'antd'
import React, { useState } from 'react'
import ax from '../../utils/ax'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
    const [fileUpload, setFileUpload] = useState([])
    const navigate = useNavigate()
    function handleChangeUpload({file, fileList}){
     setFileUpload(fileList)
    }

    console.log(fileUpload[0])

    const mutation = useMutation({
    mutationFn : async (dataProduct)=>{
        const result = await ax.post("/product/add", dataProduct )
        return result
    },
    onSuccess : (res)=>{
        navigate("/product")
        message.success("Berhasil ditambah")
    },
    onError : (error)=>{
        console.log(error)
    }
    })

    function handleAddProduct(values){
    
    const formData = new FormData()
    formData.append("nama", values.nama)
    formData.append("harga", values.harga)
    formData.append("deskripsi", values.deskripsi)
    formData.append("imgProduct", fileUpload[0].originFileObj)

    mutation.mutate(formData)

    }

  return (
    <div className='w-full h-screen'>
        <h1>Tambah Data Product</h1>
        <Form
        layout='vertical'
        onFinish={handleAddProduct}
        >
            <Form.Item
            label="Nama Product"
            name = "nama"
            >
            <Input/>
            </Form.Item>

            <Form.Item
            label="Deskripsi Product"
            name = "deskripsi"
            >
            <Input/>
            </Form.Item>


            <Form.Item
            label="Harga"
            name = "harga"
            >
            <Input/>
            </Form.Item>

            <Upload 
            fileList={fileUpload}
            beforeUpload={()=>false}
            maxCount={1}
            onChange={handleChangeUpload}
            >
                <Button>Upload</Button>
            </Upload>

            <Button htmlType='submit' type='primary' className='mt-4' >Submit</Button>


        </Form>

    </div>
  )
}

export default AddProduct