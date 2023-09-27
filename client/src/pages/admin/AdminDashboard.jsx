
import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/AdminMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios';
import {baseUrl} from '../../baseUrl'

const AdminDashboard = () => {

  const [auth] = useAuth();
  const [user,setUser]=useState([])
  const getUserData=async()=>{
     try{
        const {data}=await axios.get(`${baseUrl}/api/auth/get-single-user`)
        if(data?.success)
     {
        setUser(data.user)
     }
     else
     {
      toast.error('Something went wrong')
     }
     }catch{

     }
  }

  useEffect(()=>{
    getUserData()
  },[])

  return (

    <Layout>
    <div className='container-fluid m-3 p-3' >
      <div className='row' >
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <div className='card w-75 p-3'>
            <h3>{`Admin Name : ${user.username}`}</h3>
            <h3>{`Admin Email : ${user.email}`}</h3>
            <h3>{`Admin Contact : ${user.phone_number}`}</h3>
            <h3>{`Admin Address : ${user.address}`}</h3>
          </div>
        </div>
      </div>
      
    </div>
    </Layout>
  )
}

export default AdminDashboard
