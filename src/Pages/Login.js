import React, { useState } from "react";
import './Login.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import  auth from './Firebase'
import app from './Firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom'

function LogIn(){

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate()

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const onFinish = (e) => {
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(userCredential.user)
    navigate('/home')
    // ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    alert("Invaid email or password")
    });

  };

  return(
    <div className="login-form">
      
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item>
      <h2>Player Selection Tool</h2>
      
      </Form.Item>
      
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input 
        prefix={<UserOutlined className="site-form-item-icon" />} 
        placeholder="Username" 
        value={email}
        onChange={handleEmailChange} 
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Item>
      <Form.Item>
        

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
       
      </Form.Item>
      <Form.Item>
        
       <a href="/signup">Register now!</a>
      </Form.Item>
    </Form>
      
    </div>
  )
}

export default LogIn;