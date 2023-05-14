import React from 'react'
import Header from '../../components/Layout/Header'
import { useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPass] = useState('');
  const [username, setUsername] = useState('');
  const [answer, setAnswer] = useState('');
  const [phone_number, setNumber] = useState('');
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    const data = {
      username,
      email,
      password,
      confirmPassword,
      phone_number,
      answer,
    };


    try {
      const res = await axios.post('http://localhost:5000/api/auth/register',data);
      if (res.data.success){
        toast.success('Registered Successfully!\nLog in to continue');
        navigate('/');
      }else{
        toast.error(res.data.message);
      }
    }catch (error){
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <Toaster position="top-center" />
      <div className='container-fluid w-25' style={{marginTop: '7%',border:'1px solid #e6e5e5',borderRadius:'10px',padding:'20px'}}>
      <form onSubmit={registerUser}>
      <div className="form-group">
    <label htmlFor="exampleInputUsername">Username</label>
    <input type="text" required value={username} onChange={(e)=>setUsername(e.target.value)} className="form-control" id="exampleInputUsername" aria-describedby="emailHelp" placeholder="Enter username" />
  </div>
  <div className="form-group my-3">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" />
  </div>
  <div className="form-group my-3">
    <label htmlFor="confirmPassword">Confirm Password</label>
    <input type="password" required value={confirmPassword} onChange={(e)=>setConfirmPass(e.target.value)} className="form-control" id="exampleInputUsername" aria-describedby="emailHelp" placeholder="Confirm password" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputUsername">Phone number</label>
    <input type="text" required value={phone_number} onChange={(e)=>setNumber(e.target.value)} className="form-control" id="exampleInputPhone" aria-describedby="emailHelp" placeholder="Enter phone number" />
  </div>
  <div className="form-group my-3">
    <label htmlFor="exampleInputUsername">Answer</label>
    <input type="password" required value={answer} onChange={(e)=>setAnswer(e.target.value)} className="form-control" id="exampleInputAnswer" aria-describedby="emailHelp" placeholder="Enter answer" />
  </div>
  <button type="submit" className="btn btn-primary">Register</button>
</form>
</div>
    </>
  )
}

export default Register