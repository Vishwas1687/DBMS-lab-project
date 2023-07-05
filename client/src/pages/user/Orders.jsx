import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import {Link} from 'react-router-dom'
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import {baseUrl} from '../../baseUrl.js'

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [orderSearch,setOrderSearch]=useState('')
  const [auth,setAuth]=useAuth()
  const [user,setUser]=useState([])
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${baseUrl}/api/orders/get-order-by-user`);
        if (data?.success) {
          setOrders(data.order);
          console.log(data)
        } else {
          toast.error(data.message);
        }
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    fetchOrders();
  }, []);

  const getUserData=async()=>{
     try{
        const {data}=await axios.get(`${baseUrl}/api/auth/get-single-user/${auth.token}`)
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
  color:'black'
};

const viewButtonStyle = {
  backgroundColor: 'green',
  color: '#fff',
  border:'2px solid #000',
  padding: '8px 16px',
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
    <>
      <Layout title={`Dashboard - ${user.username} Orders`}>
        <div className="container-fluid dashboard" style={{'overflow':'hidden'}}>
          <div className="row">
            <div className="col-md-3" style={{'margin-top':'2rem'}}>
              <UserMenu />
            </div>
            <div className="col-md-9" style={{'margin-top':'2rem'}}>
              <h1>Orders</h1>
              <br />

            
                <div className='search'>
                 <div className='searchInput mb-3' style={{'border':'2px solid #111','width':'25%'}}>
                 <input type="text" value={orderSearch}
                 placeholder="Enter order info..." onChange={(e)=>setOrderSearch(e.target.value)}/>
                 
                  <div className="searchIcon">
                {orderSearch ? <AiOutlineClose style={{'font-size':'1.5rem'}} id="clearBtn" onClick={()=>{setOrderSearch("")}}/> :  <BiSearch style={{'font-size':'1.5rem'}}/>}
                 </div>
                 </div>
                 </div>

              <div>
                <table className="table" style={{'border-collapse':'collapse',width:'100%','border':'2px solid #111'}}>
                  <thead>
                    <tr>
                      <th style={tableHeaderStyle} scope="col">Order ID</th>
                      {/* <th scope="col">Customer</th> */}
                      <th style={tableHeaderStyle} scope="col">Status</th>
                      <th style={tableHeaderStyle} scope="col">Shipping Address</th>
                      <th style={tableHeaderStyle} scope="col">Total Amount</th>
                      <th style={tableHeaderStyle} scope="col">Order Date</th>
                      <th style={tableHeaderStyle} scope="col">Delivery Date</th>
                      <th style={tableHeaderStyle} scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading ? orders && orders.length > 0 ? (
                      orders?.filter((c)=>{
                        
                    if (orderSearch === '') return c;
                   else {
                    const formattedOrderDate = `${new Date(c.order_date).getDate()}/${new Date(c.order_date).getMonth()}/${new Date(c.order_date).getFullYear()} ${new Date(c.order_date).getHours()}:${new Date(c.order_date).getMinutes()}:${new Date(c.order_date).getSeconds()}`;
                    const deliveredOrderDate = `${new Date(c.delivery_date).getDate()}/${new Date(c.delivery_date).getMonth()}/${new Date(c.delivery_date).getFullYear()} ${new Date(c.delivery_date).getHours()}:${new Date(c.delivery_date).getMinutes()}:${new Date(c.delivery_date).getSeconds()}`;
                   return (
                  c.status.toLowerCase().includes(orderSearch.toLowerCase()) ||
                  deliveredOrderDate.toLowerCase().includes(orderSearch.toLowerCase()) ||
                  formattedOrderDate.toLowerCase().includes(orderSearch.toLowerCase()) ||
                  c.order_id.toLowerCase().includes(orderSearch.toLowerCase()) ||
                  c.shipping_address.toLowerCase().includes(orderSearch.toLowerCase()) ||
                  c.total_amount.toString().includes(orderSearch)
      );
    }
                  })
                   ?.map((c,index) => (
                        <tr key={c.order_id} style={{backgroundColor:index%2==1?'#4CAF50':'#3CB371'}}>
                          <td style={tableCellStyle}>{c.order_id}</td>
                          {/* <td>{c.customer.username}</td> */}
                          <td style={tableCellStyle}>{c.status}</td>
                          <td style={tableCellStyle}>{c.shipping_address}</td>
                          <td style={tableCellStyle}>{c.total_amount}</td>
                          <td style={tableCellStyle}>{`${new Date(c.order_date).getDate()}/${new Date(c.order_date).getMonth()}/${new Date(c.order_date).getFullYear()}   ${new Date(c.order_date)?.getHours()}:${new Date(c.order_date)?.getMinutes()}:${new Date(c.order_date)?.getSeconds()}`}</td>
                          <td style={tableCellStyle}>{c.delivery_date?`${new Date(c.delivery_date)?.getDate()}/${new Date(c.delivery_date)?.getMonth()}/${new Date(c.delivery_date)?.getFullYear()}    ${new Date(c.delivery_date)?.getHours()}:${new Date(c.delivery_date)?.getMinutes()}:${new Date(c.delivery_date)?.getSeconds()}`:''}</td>
                          <td style={tableCellStyle}>
                            <Link to={`/user/single-order/${c.order_id}`}>
                            <button className="btn btn-info ms-2" style={viewButtonStyle}>View</button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" style={noOrdersCellStyle}>No orders found.</td>
                      </tr>
                    ): <div style={loadingCellStyle}>Loading...</div>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserOrders;
