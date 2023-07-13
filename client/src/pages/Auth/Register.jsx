import React from 'react'
import Header from '../../components/Layout/Header'
import { useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {baseUrl} from '../../baseUrl'
import Layout from '../../components/Layout/Layout.jsx';
import FormInput from "../../components/Form/FormInput.jsx";
import "../../components/styles/FormInput.css";

const Register = () => {
  
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');
  // const [confirmPassword, setConfirmPass] = useState('');
  // const [username, setUsername] = useState('');
  // const [answer, setAnswer] = useState('');
  // const [phone_number, setNumber] = useState('');

  const [values, setValues] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    answer:" "
  });

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    const data = {
      username:values.username,
      email:values.email,
      password:values.password,
      confirmPassword:values.confirmPassword,
      phone_number:values.phone_number,
      answer:values.answer,

      // username,
      // email,
      // password,
      // confirmPassword,
      // phone_number,
      // answer,
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

   const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username*",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email*",
      required: true,
    },
    {
      id: 3,
      name: "address",
      type: "text",
      placeholder: "Address",
      label: "Address",
    },
    {
      id: 4,
      name: "phone_number",
      type: "text",
      placeholder: "Phone Number",
      label: "Phone Number*",
      errorMessage:"Phone Number should contain 10 digits or country code only +91 with space or hypen and 10 digit is accepted",
      pattern: `^((\+){0,1}91(\s){0,1}(\-){0,1}(\s){0,1}){0,1}9[0-9](\s){0,1}(\-){0,1}(\s){0,1}[1-9]{1}[0-9]{7}$`,
      required:true
    },
    
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password*",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password*",
      pattern: values.password,
      required: true,
    },
    {
      id: 7,
      name: "Alternate Password",
      type: "password",
      placeholder: "Alternate Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Alternate Password*",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];


  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
    <div className="registerPage">
      <form onSubmit={registerUser} className='registerForm'>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <br></br>
        <button className="register-btn">Submit</button>
      </form>
    </div>
    <br></br>
    </Layout>
  );








//   return (
//     <>
//       <Header />
//       <Toaster position="top-center" />
//       <h1 style={{'margin-top':'5rem','margin-left':'42rem','font-weight':'bold'}}>Register</h1>
//       <div className='container-fluid w-25' style={{marginTop: '2rem',border:'2px solid #111',borderRadius:'10px',padding:'20px'}}>
//       <form onSubmit={registerUser}>
//       <div className="form-group">
//     <label htmlFor="exampleInputUsername" style={{'font-weight':'bold'}}>Username</label>
//     <input type="text" required value={username} onChange={(e)=>setUsername(e.target.value)} className="form-control" id="exampleInputUsername" aria-describedby="emailHelp" placeholder="Enter username" 
//     style={{'border':'2px solid #111'}}/>
//   </div>
//   <div className="form-group my-3">
//     <label htmlFor="exampleInputEmail1" style={{'font-weight':'bold'}}>Email address</label>
//     <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" 
//      style={{'border':'2px solid #111'}}/>
//   </div>
//   <div className="form-group">
//     <label htmlFor="exampleInputPassword1" style={{'font-weight':'bold'}}>Password</label>
//     <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" 
//      style={{'border':'2px solid #111'}}/>
//   </div>
//   <div className="form-group my-3">
//     <label htmlFor="confirmPassword" style={{'font-weight':'bold'}}>Confirm Password</label>
//     <input type="password" required value={confirmPassword} onChange={(e)=>setConfirmPass(e.target.value)} className="form-control" id="exampleInputUsername" aria-describedby="emailHelp" placeholder="Confirm password"
//      style={{'border':'2px solid #111'}} />
//   </div>
//   <div className="form-group">
//     <label htmlFor="exampleInputUsername" style={{'font-weight':'bold'}}>Phone number</label>
//     <input type="text" required value={phone_number} onChange={(e)=>setNumber(e.target.value)} className="form-control" id="exampleInputPhone" aria-describedby="emailHelp" placeholder="Enter phone number"
//      style={{'border':'2px solid #111'}} />
//   </div>
//   <div className="form-group my-3">
//     <label htmlFor="exampleInputUsername" style={{'font-weight':'bold'}}>Answer</label>
//     <input type="password" required value={answer} onChange={(e)=>setAnswer(e.target.value)} className="form-control" id="exampleInputAnswer" aria-describedby="emailHelp" placeholder="Enter answer"
//      style={{'border':'2px solid #111'}} />
//   </div>
//   <button type="submit" className="btn btn-primary"
//   style={{'border':'2px solid #111','font-weight':'bold','width':'21rem','font-size':'1.3rem'}}>Register</button>
// </form>
// </div>
// <br></br>
// <br></br>
//     </>
    
//   )
}

export default Register