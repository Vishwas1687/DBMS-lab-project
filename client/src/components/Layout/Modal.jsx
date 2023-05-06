import React from 'react'
import { useState,useRef} from 'react';
import axios from 'axios'
import { NavLink , Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

export default function Modal() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const closeRef = useRef();
    const [auth,setAuth] = useAuth();

    const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login',data);
      if (res.data.success){
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth',JSON.stringify(res.data));
        closeRef.current.click();
      }else{
        toast.error(res.data.message);
      }
    }catch (error){
      if (error.response){
        toast.error(error.response.data.message);
      }else{
        console.error(error);
      }
    }
  };

  return (
    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalCenterTitle">Login</h5>
        <button type="button" className="btn-close" data-dismiss='modal' aria-label="Close" ref={closeRef}>
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-control my-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
  </div>
  <div className="form-group my-4">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="form-control my-2" id="exampleInputPassword1" placeholder="Password" />
  </div>
  <div className='text-center'>
  <button type="submit" className="btn btn-primary">Log In</button>
  </div>
</form>
      </div>
      <div className="modal-footer" style={{justifyContent:'center'}} >
        <NavLink to = "/register" className="nav-link" onClick={()=>{closeRef.current.click();navigate('/register');}} >
            New User? Click here to register.
          </NavLink>
        </div>
    </div>
  </div>
</div>
  )
}
