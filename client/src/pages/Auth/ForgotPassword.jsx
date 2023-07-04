import React from 'react'
import Header from '../../components/Layout/Header'
import { useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPass] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();

    const resetPassword = async (e) => {
        e.preventDefault();
    
        const data = {
          email,
          password,
          confirmPassword,
          answer,
        };
    
    
        try {
          const res = await axios.put('http://localhost:5000/api/auth/forgot-password',data);
          if (res.data.success){
            toast.success('Password reset!\nLog in to continue');
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
    <h2 style={{'font-weight':'bold','margin':'5rem 0 0 40rem'}}>Forgot Password</h2>
      <div className='container-fluid w-25' style={{marginTop: '2%',border:'2px solid #111',borderRadius:'10px',padding:'20px'}}>
      <form onSubmit={resetPassword}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1" style={{'font-weight':'bold'}}>Email</label>
    <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" 
    style={{'border':'2px solid #111'}}/>
  </div>
  <div className="form-group mt-3">
    <label htmlFor="exampleInputPassword1" style={{'font-weight':'bold'}}>Password</label>
    <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password"
    style={{'border':'2px solid #111'}} />
  </div>
  <div className="form-group mt-3">
    <label htmlFor="confirmPassword" style={{'font-weight':'bold'}}>Confirm Password</label>
    <input type="password" required value={confirmPassword} onChange={(e)=>setConfirmPass(e.target.value)} className="form-control" id="exampleInputUsername" aria-describedby="emailHelp" placeholder="Confirm password" 
    style={{'border':'2px solid #111'}}/>
  </div>
  <div className="form-group mt-3">
    <label htmlFor="exampleInputUsername" style={{'font-weight':'bold'}}>Answer</label>
    <input type="password" required value={answer} onChange={(e)=>setAnswer(e.target.value)} className="form-control" id="exampleInputAnswer" aria-describedby="emailHelp" placeholder="Enter answer"
    style={{'border':'2px solid #111'}} />
  </div>
  <div className='text-center mt-3'>
  <button type="submit" className="btn btn-primary" style={{'font-weight':'bold','border':'2px solid #111'}}>Reset Password</button>
  </div>
</form>
</div>
    </>

  )
}

export default ForgotPassword