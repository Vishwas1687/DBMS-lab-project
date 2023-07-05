import { useState,useRef,useEffect} from 'react';
import axios from 'axios'
import { NavLink , Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import toast from 'react-hot-toast'
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import '../styles/Modal.css'
import { GoogleChromeLogo, GoogleLogo } from 'phosphor-react';
import {baseUrl} from '../../baseUrl'

export default function Modal() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const closeRef = useRef();
    const [auth,setAuth] = useAuth();

    const location = useLocation();
    const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const res = await axios.post(`${baseUrl}/api/auth/login`,data);
      if (res.data.success){
        toast.success(res.data.message);
        setAuth({
          ...auth,
          token: res.data.token,
        });
        localStorage.setItem('auth',JSON.stringify(res.data.token));
        setPassword('');
        setEmail('');
        closeRef.current.click();
        navigate(returnPath);
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

  const [returnPath,setReturnPath]=useState(null)
    useEffect(()=>{
     setReturnPath(location.state?.returnPath||'/')
  },[])

  


  return (
    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title" id="exampleModalCenterTitle" style={{'font-weight':'bold','margin-left':'40%'}}>Login</h4>
        <button type="button" className="btn-close" data-dismiss='modal' aria-label="Close" ref={closeRef}>
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1" style={{'font-weight':'bold'}}>Email address</label>
    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-control my-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" 
    style={{'border':'2px solid #111'}}/>
  </div>
  <div className="form-group my-4">
    <label htmlFor="exampleInputPassword1" style={{'font-weight':'bold'}}>Password</label>
    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="form-control my-2" id="exampleInputPassword1" placeholder="Password" 
    style={{'border':'2px solid #111'}}/>
  </div>
  <NavLink style={{textAlign:'center'}} to="/forgot-password" className="nav-link mb-3 underline" onClick={()=>{closeRef.current.click();navigate('/forgot-password');}} >
            <button className='btn btn-primary' style={{'border':'2px solid #111','font-weight':'bold'}}>Forgot Password?</button>
  </NavLink>
  <div>
  <button type="submit" className="btn btn-success" style={{'margin-left':'8rem','font-weight':'bold','border':'2px solid #111'}}>Log In</button>
  <button className="btn btn-danger" style={{'height':'2.5rem',padding:"0",'position':'absolute','margin-left':'1rem',
   'font-weight':'bold','border':'2px solid #111'}}>
  <a href={`${baseUrl}/api/auth/google`} style={{display:'block',width:"100%",
  height:"100%",'position':'relative','top':'17%','font-weight':'bold'}}>
     Google Login
     <GoogleLogo size="25"/>
   </a>
    </button>
  </div>
</form>
      </div>
      <div className="modal-footer" style={{justifyContent:'center'}} >
        <NavLink to="/register" className="nav-link underline" onClick={()=>{closeRef.current.click();navigate('/register');}} >
          <button className="btn btn-primary" style={{'font-weight':'bold','border':'2px solid #111'}}> New User? Click here to register. </button>
            
          </NavLink>
        </div>
    </div>
  </div>
</div>
  )
}
