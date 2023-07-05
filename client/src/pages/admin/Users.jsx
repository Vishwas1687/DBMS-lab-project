import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/AdminMenu'
import Dashboard from '../user/Dashboard'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import '../../components/styles/Users.css'
import {baseUrl} from '../../baseUrl'

const Users = () => {


  const [users, setUsers] = useState([]);
  const [search__,setSearch__] = useState('');

  const getAllUsers = async ()=>{
    try{
        const {data} = await axios.get(`${baseUrl}/api/auth/get-all-users/`);
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


 const tableHeaderStyle = {
  backgroundColor: '#006400',
  color: '#fff',
  padding: '10px',
  textAlign: 'left',
  fontWeight: 'bold',
  border: '2px solid #111',
  fontFamily: 'Arial, sans-serif',
};

const tableCellStyle = {
  padding: '10px',
  borderBottom: '2px solid #000',
  borderRight: '2px solid #000',
  fontFamily: 'Arial, sans-serif',
  color:'black',
  fontWeight:'bold'
};

const viewButtonStyle = {
  backgroundColor: 'green',
  color: '#fff',
  border:'2px solid #000',
  padding: '8px 8px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontFamily: 'Arial, sans-serif',
};

const editButtonStyle = {
  backgroundColor: 'blue',
  color: '#fff',
  border:'2px solid #000',
  padding: '8px 8px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontFamily: 'Arial, sans-serif',
};

const deleteButtonStyle = {
  backgroundColor: 'red',
  color: '#fff',
  border:'2px solid #000',
  padding: '8px 8px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontFamily: 'Arial, sans-serif',
};

const noOrdersCellStyle = {
  padding: '10px',
  textAlign: 'center',
  fontStyle: 'italic',
  backgroundColor: '#f5f5f5',
  fontFamily: 'Arial, sans-serif',
};

const loadingCellStyle = {
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#f5f5f5',
  fontFamily: 'Arial, sans-serif',
};      

  return (
    <Layout title = {"Dashboard-All Users"}>
        <div className="container-fluid dashboard">
    <div className="row">
    <div className="col-md-3" style={{'margin-top':'2rem'}}>
            <AdminMenu />
          </div>

            <div className='col-md-9' style={{'margin-top':'2rem'}}>
                <h1>All Users</h1>
                <div>
                <div>
                  <input type='text' value={search__} onChange={e => {setSearch__(e.target.value)}} className='mb-5' placeholder="Search..." style={{border:'2px solid #656363',padding:'10px'}}/> 
                   {search__ ? <AiOutlineClose style={{'font-size':'2.9rem','border':'2px solid #111'}} id="clearBtn" onClick={()=>{setSearch__("")}}/> :  <BiSearch style={{'font-size':'2.9rem','border':'2px solid #111'}}/>}
                </div>
                </div>
                <div>
                <table className="table">
                <thead>
                  <tr>
                    <th style={tableHeaderStyle} scope="col">ID</th>
                    <th style={tableHeaderStyle} scope="col">Username</th>          
                    <th style={tableHeaderStyle} scope="col">Email</th>
                    <th style={tableHeaderStyle} scope="col">Phone Number</th>
                    <th style={tableHeaderStyle} scope="col">Address</th>
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
      <tr key={user.user_id} style={{backgroundColor:index%2==1?'#4CAF50':'#3CB371'}}>
      <td style={tableCellStyle}>{user.user_id}</td>
      <td style={tableCellStyle}>{user.username}</td>
      <td style={tableCellStyle}>{user.email}</td>
      <td style={tableCellStyle}>{user.phone_number}</td>
      <td style={tableCellStyle}>{user.address ? user.address : "No address"}</td>
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
