import React from 'react'
import Header from '../../components/Layout/Header'
import { useState } from 'react'
import axios from 'axios';

const Register = () => {
  
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPass] = useState('');
  const [username, setUsername] = useState('');
  const [answer, setAnswer] = useState('');
  const [phone_number, setNumber] = useState('');

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

    axios.post('http://localhost:5000/api/auth/register',data)
    .then((response) => {
      console.log(response.data.message);
    })
    .catch((error)=>{
      if (error.response){
        console.log(error.response.data.message);
      }else{
        console.log('Error',error.message);
      }
  })
  };

  return (
    <>
      <Header />
      <form onSubmit={registerUser}>
      <div className="form-group">
    <label htmlFor="exampleInputUsername">Username</label>
    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} className="form-control" id="exampleInputUsername" aria-describedby="emailHelp" placeholder="Enter username" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" />
  </div>
  <div className="form-group">
    <label htmlFor="confirmPassword">Confirm Password</label>
    <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPass(e.target.value)} className="form-control" id="exampleInputUsername" aria-describedby="emailHelp" placeholder="Confirm password" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputUsername">Phone number</label>
    <input type="text" value={phone_number} onChange={(e)=>setNumber(e.target.value)} className="form-control" id="exampleInputPhone" aria-describedby="emailHelp" placeholder="Enter phone number" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputUsername">Answer</label>
    <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)} className="form-control" id="exampleInputAnswer" aria-describedby="emailHelp" placeholder="Enter answer" />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </>
  )
}

export default Register