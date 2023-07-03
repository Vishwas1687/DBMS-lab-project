import React,{useState,useEffect} from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'


const Dashboard = () => {
  const [auth,setAuth] = useAuth();
  const [user,setUser] =useState([])

  const getUserData=async()=>{
     const {data}=await axios.get(`http://localhost:5000/api/auth/get-single-user/${auth.token}`)
     if(data?.success)
     {
        setUser(data.user)
     }
     else
     {
      toast.error('Something went wrong')
     }

  }
  useEffect(()=>{
    getUserData() 
  },[])
  return (
    <div>
      <Layout title={`Dashboard ${user.username}`}>
    <div className='container-fluid m-3 p-3' >
      <div className='row' >
        <div className='col-md-3'>
          <UserMenu />
        </div>
        <div className='col-md-9'>
        <div className='card w-75 p-3'>
            <h3>User Name : {user.username}</h3>
            <h3>User Email : {user.email}</h3>
            <h3>User Contact : {user.phone_number}</h3>
            <h3>User Address : {user.address}</h3>
          </div>
        </div>
      </div>
      
    </div>
    </Layout>
    </div>
  )
}

export default Dashboard
