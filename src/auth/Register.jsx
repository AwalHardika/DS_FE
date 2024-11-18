import React, { useState } from "react";
import { Form, Input, Button, Upload, Row, Col } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [imgProfile64, setImgProfile64] = useState(null);
  const navigate = useNavigate()

  function handleChangeImageProfile({ file }) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgProfile64(reader.result);
    };
    reader.readAsDataURL(file.originFileObj);
  }

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
    
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  function handleSubmitRegister(e){
    const {username, email, password, rePassword} = e
    if(password !== rePassword){
      return alert("password dan repassword tidak sama")
    }
    const data = {
      username, email, password, imageProfile : imgProfile64
    }

    console.log(data)
    axios.post("http://localhost:3000/api/register", data).then(res =>{
      alert("Anda berhasil membuat akun")
      navigate("/")
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Form
        autoComplete="off"
        className="w-[600px] h-auto p-4 border border-slate-400 rounded-md bg-white"
        layout="vertical"
        onFinish={handleSubmitRegister}
      >
        <h1 className="text-blue-600 font-bold text-center mb-6">
          FORM REGISTER
        </h1>
        <Row gutter={16}>
          <Col className="w-[50%]">
            <Form.Item
              label="Username :"
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email :"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password :"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Please input your password",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Re Password :"
              name={"rePassword"}
              rules={[
                {
                  required: true,
                  message: "Please input your re-entered password",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Upload Image Profile">
              <Upload
                maxCount={1}
                showUploadList={false}
                listType="picture-card"
                className="avatar-uploader"
                onChange={handleChangeImageProfile}
              >
                {imgProfile64 ? (
                  <img
                    src={imgProfile64}
                    alt="avatar"
                    style={{
                      width: "100%",
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>

              {/* {
                imgProfile64 && (
                <div className='mt-4 w-[200px] relative h-[200px]'>
                  <img src={imgProfile64} alt="" srcset="" className='w-full h-full' />
                  <div className='w-[30px] h-[30px] text-white bg-red-600 flex justify-center items-center absolute top-0 right-0'>
                    X
                  </div>
                </div>)
              } */}
            </Form.Item>
          </Col>
        </Row>

        <NavLink to={"/"}>
          <h1 className="text-blue-600 mb-4">
            Already have an account? Sign in here
          </h1>
        </NavLink>
        <Button htmlType="submit" type="primary" className="w-full">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
