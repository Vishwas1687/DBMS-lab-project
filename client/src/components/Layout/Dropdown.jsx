import React,{useRef} from 'react'
import {User} from 'phosphor-react'
import { NavLink , Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/Dropdown.css'
import { useAuth } from '../../context/auth';
import { useNavigate,useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Dropdown() {

    const navigate = useNavigate();
    const location=useLocation()
    const [auth,setAuth] = useAuth();
    const anchorRef=useRef(null)

    const [isAdmin,setIsAdmin] = useState(false);

    useEffect(() => {
      const authCheck = async () => {
        const res = await axios.get("http://localhost:5000/api/auth/admin-auth");
        if (res.data.ok) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      };
      if (auth?.token) authCheck();
    }, [auth?.token]);

    const [returnPath,setReturnPath]=useState(null)

    useEffect(()=>{
     setReturnPath(location.state?.returnPath||'/')
    //  if(location.state?.returnPath)
    //  anchorRef.current.click()
  },[])


    return (
    <div className="dropdown dropdown-hover">
        <NavLink className='nav-link'>
        <User size={32} style={{'font-weight':'bold',color:'white'}}/>
        </NavLink>
      
      { !(auth.token) ? (<>
        <div className={`dropdown-menu positionDropdown login`} >
        <a className="dropdown-item " href="#" data-toggle="modal" data-target="#exampleModalCenter" ref={anchorRef}
        >Log In</a>
      </div>
      </>) :
      (<>
        <div className={`dropdown-menu positionDropdown dashboard`} >
        <Link className="dropdown-item" to={`/${ isAdmin ? 'admin' : 'user'}/`} >Dashboard</Link>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item " onClick={()=>{
          localStorage.removeItem('cart');
          localStorage.removeItem('quantityLocal');
          navigate('/');
          window.location.reload();
          setAuth({...auth, token:''});localStorage.removeItem('auth');toast('Logged out!');
        }}>Logout</a>

      </div>

      </>)
  }
    
      
    </div>
  )
}
