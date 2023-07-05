import React from 'react'
import Header from '../../components/Layout/Header'
import { useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {baseUrl} from '../../baseUrl'

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
      const res = await axios.post(`${baseUrl}/api/auth/register`,data);
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
      <h1 style={{'margin-top':'5rem','margin-left':'42rem','font-weight':'bold'}}>Register</h1>
      <div className='container-fluid w-25' style={{marginTop: '2rem',border:'2px solid #111',borderRadius:'10px',padding:'20px'}}>
      <form onSubmit={registerUser}>
      <div className="form-group">
    <label htmlFor="exampleInputUsername" style={{'font-weight':'bold'}}>Username</label>
    <input type="text" required value={username} onChange={(e)=>setUsername(e.target.value)} className="form-control" id="exampleInputUsername" aria-describedby="emailHelp" placeholder="Enter username" 
    style={{'border':'2px solid #111'}}/>
  </div>
  <div className="form-group my-3">
    <label htmlFor="exampleInputEmail1" style={{'font-weight':'bold'}}>Email address</label>
    <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" 
     style={{'border':'2px solid #111'}}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1" style={{'font-weight':'bold'}}>Password</label>
    <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" 
     style={{'border':'2px solid #111'}}/>
  </div>
  <div className="form-group my-3">
    <label htmlFor="confirmPassword" style={{'font-weight':'bold'}}>Confirm Password</label>
    <input type="password" required value={confirmPassword} onChange={(e)=>setConfirmPass(e.target.value)} className="form-control" id="exampleInputUsername" aria-describedby="emailHelp" placeholder="Confirm password"
     style={{'border':'2px solid #111'}} />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputUsername" style={{'font-weight':'bold'}}>Phone number</label>
    <input type="text" required value={phone_number} onChange={(e)=>setNumber(e.target.value)} className="form-control" id="exampleInputPhone" aria-describedby="emailHelp" placeholder="Enter phone number"
     style={{'border':'2px solid #111'}} />
  </div>
  <div className="form-group my-3">
    <label htmlFor="exampleInputUsername" style={{'font-weight':'bold'}}>Answer</label>
    <input type="password" required value={answer} onChange={(e)=>setAnswer(e.target.value)} className="form-control" id="exampleInputAnswer" aria-describedby="emailHelp" placeholder="Enter answer"
     style={{'border':'2px solid #111'}} />
  </div>
  <button type="submit" className="btn btn-primary"
  style={{'border':'2px solid #111','font-weight':'bold','width':'21rem','font-size':'1.3rem'}}>Register</button>
</form>
</div>
<br></br>
<br></br>
    </>
  )
}

export default Register