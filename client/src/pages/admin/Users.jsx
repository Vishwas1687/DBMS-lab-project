import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/AdminMenu'
import Dashboard from '../user/Dashboard'
import { useState,useEffect } from 'react'
import axios from 'axios'
import '../../components/styles/Users.css'

const Users = () => {


  const [users, setUsers] = useState([]);
  const [search__,setSearch__] = useState('');

  const getAllUsers = async ()=>{
    try{
        const {data} = await axios.get('http://localhost:5000/api/auth/get-all-users/');
        setUsers(data.users);
        // setProducts(data);
    }
    catch(error)
    {
        console.error(error);
    }
   }
   //console.log(products)

  // Fetch products from backend on initial load
  useEffect(() => {
      getAllUsers()
    },[]);

  return (
    <Layout title = {"Dashboard-All Users"}>
        <div className="container-fluid m-3 p-3 dashboard">
    <div className="row">
    <div className="col-md-3">
            <AdminMenu />
          </div>

            <div className='col-md-9'>
                <h1>All Users</h1>
                <div>
                <div>
                  <input type='text' value={search__} onChange={e => {setSearch__(e.target.value)}} className='mb-5' placeholder="Search..." style={{border:'1px solid #656363',padding:'10px'}}/>
                </div>
                </div>
                <div>
                <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>          
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Address</th>
                  </tr>
                </thead>
                <tbody>
                {users.length ? 

users.filter((c)=>{
  if (search__ === '') return c;
  else if (c.username.toLowerCase().includes(search__.toLowerCase())){
    return c;
  }
}).map((user,index)=>(
  <>
      <tr key={user.user_id}>
      <td>{user.user_id}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.phone_number}</td>
      <td>{user.address ? user.address : "No address"}</td>
      </tr>
    
  </>
    
))
:<>
No users...
</>}

                </tbody>

                </table>
                
                </div>
              
                
            
            </div>
        </div>
        <div>
        
      {/* id,name,email,phone no, contact, address  and   search manage */}
        </div>
        </div>
        
    </Layout>
  )
}

export default Users
