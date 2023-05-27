import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserMenu from '../../components/Layout/UserMenu';
import Layout from "../../components/Layout/Layout";
import {useAuth} from '../../context/auth'
import toast from 'react-hot-toast'
import PasswordForm from '../../components/Form/PasswordForm';
import {useNavigate} from 'react-router-dom'
import Modal from 'antd/es/modal/Modal';

const UpdateProfilePage = () => {
    const navigate=useNavigate()
  const [answerVisible,setAnswerVisible]=useState(false)
  const [passwordVisible,setPasswordVisible]=useState(false)
  const [auth,setAuth]=useAuth()
  const [user,setUser]=useState({
    username:auth.user.username,
    address:auth.user.address,
    phone_number:auth.user.phone_number
  })
  const [password,setPassword]=useState(null)
  const [answer,setAnswer]=useState(null)

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleAnswerChange=(e)=>{
    e.preventDefault()
    toast.success('Answer changed')
    setAnswer(answer)
    setAnswerVisible(false)
  }

  const handlePasswordChange=(e)=>{
    e.preventDefault()
    toast.success('Password changed')
    setPassword(password)
    setPasswordVisible(false)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
       const {data}=await axios.put('http://localhost:5000/api/auth/update-profile',{
           username:user.username,
           address:user.address,
           phone_number:user.phone_number,
           password:password,
           answer:answer
       })
       if(data.success)
       {
          localStorage.setItem('auth',JSON.stringify(user))
          setUser({
            username:'',
            phone_number:'',
            address:''
          })
          navigate('/user')
          toast.success(data.message)
       }
       else
       {
        toast.error(data.message)
       }
    }catch(error)
    {
        toast.error('Something went wrong')
    }
  };

  return (
    <Layout title={`Dashboard - ${auth.user.username} update profile`}>
        
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-3">
        <UserMenu/>
        </div>
    <div className="col-md-9 create-category-section">
    <h1>Update Profile</h1>
      <form onSubmit={(e)=>handleSubmit(e)}>
      <div className="form-group text-left">
      <label style={{fontSize:'1.5rem'}}>
          Username:
       </label>   
          <br></br>
          <input
            type="text"
            style={{width:'20rem', fontSize:'1.2rem',padding:'0.5rem'}}
            required="true"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div className="form-group text-left">
        <label style={{fontSize:'1.5rem'}}>
          Address:
        </label>  
          <br></br>
          <input
            type="text"
            style={{width:'20rem', fontSize:'1.2rem',padding:'0.5rem'}}
            name="address"
            required="true"
            value={user.address}
            onChange={handleChange}
          />
        
        <br></br>
        </div>
        <br></br>
        <div className="form-group text-left">
        <label style={{fontSize:'1.5rem'}}>
          Phone Number:
        </label>  
          <br></br>
          <input
            type="text"
            style={{width:'20rem', fontSize:'1.2rem',padding:'0.5rem'}}
            name="phone_number"
            required="true"
            value={user.phone_number}
            onChange={handleChange}
          />
        <br></br>

      </div>
      <br></br>
        <div className="btn-container">
           <button type="button" className="btn btn-primary m-1" onClick={()=>setPasswordVisible(true)} >Update Password</button>
           <button type="button" className="btn btn-outline-primary m-1" onClick={()=>setAnswerVisible(true)}>Update answer</button>
        </div>
        <br></br>
        <button type="submit" className="btn btn-success ms-2 w-25">Save</button>
      </form>
      

    </div>
    <style jsx>{`
        .form-group text-left {
          padding-top: 50px;
          text-align: center;
        }
        .form-control{
          width:500px
        }
      `}</style>

     <Modal
  onCancel={() => setAnswerVisible(false)}
  footer={null}
  visible={answerVisible}
>
  <PasswordForm
    value={answer}
    setValue={setAnswer}
    handleSubmit={handleAnswerChange}
  />
</Modal>
    <Modal
  onCancel={() => setPasswordVisible(false)}
  footer={null}
  visible={passwordVisible}
>
  <PasswordForm
    value={password}
    setValue={setPassword}
    handleSubmit={handlePasswordChange}
  />
</Modal>


    </div>
    </div>
    
      
    </Layout>
  );
};

export default UpdateProfilePage;