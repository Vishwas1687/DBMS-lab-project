import React from 'react'
import {User} from 'phosphor-react'
import { NavLink , Link} from 'react-router-dom';
import { useState } from 'react';
import '../styles/Dropdown.css'
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Dropdown() {

    const navigate = useNavigate();

    const [auth,setAuth] = useAuth();

    return (
    <div className="dropdown dropdown-hover">
        <NavLink className='nav-link'>
        <User size={32} />
        </NavLink>
      
      { !(auth.user) ? (<>
        <div className={`dropdown-menu positionDropdown`} >
        <a className="dropdown-item " href="#" data-toggle="modal" data-target="#exampleModalCenter">Log In</a>
      </div>
      </>) :
      (<>
        <div className={`dropdown-menu positionDropdown`} >
        <Link className="dropdown-item" to={`/${auth?.user?.role === 1 ? 'admin' : 'user'}/`} >Dashboard</Link>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item " onClick={()=>{
          setAuth({...auth, user:null,token:''});localStorage.removeItem('auth');navigate('/');toast('Logged out!');
        }}>Logout</a>

      </div>

      </>)
  }
    
      
    </div>
  )
}
