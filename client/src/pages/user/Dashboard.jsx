import React from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import Layout from '../../components/Layout/Layout'

const Dashboard = () => {
  const [auth,setAuth] = useAuth();
  return (
    <div>
      <Layout>
    <div className='container-fluid m-3 p-3' >
      <div className='row' >
        <div className='col-md-3'>
          <UserMenu />
        </div>
        <div className='col-md-9'>
        <div className='card w-75 p-3'>
            <h3>User Name : {auth?.user?.username}</h3>
            <h3>User Email : {auth?.user?.email}</h3>
            <h3>User Contact : {auth?.user?.phone_number}</h3>
            <h3>User Address : {auth?.user?.address}</h3>
          </div>
        </div>
      </div>
      
    </div>
    </Layout>
    </div>
  )
}

export default Dashboard
