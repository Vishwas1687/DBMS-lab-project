import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import {Link} from 'react-router-dom'
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [orderSearch,setOrderSearch]=useState('')
  const [auth,setAuth]=useAuth()
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/api/orders/get-order-by-user");
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

  return (
    <>
      <Layout title={`Dashboard - ${auth.user.username} Orders`}>
        <div className="container-fluid m-3 p-3 dashboard">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h1>Orders</h1>
              <br />

            
                <div className='search'>
                 <div className='searchInput mb-3' style={{'border':'1px solid #111','width':'25%'}}>
                 <input type="text" value={orderSearch}
                 placeholder="Enter order info..." onChange={(e)=>setOrderSearch(e.target.value)}/>
                 
                  <div className="searchIcon">
                {orderSearch ? <AiOutlineClose id="clearBtn" onClick={()=>{setOrderSearch("")}}/> :  <BiSearch />}
                 </div>
                 </div>
                 </div>

              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Order ID</th>
                      {/* <th scope="col">Customer</th> */}
                      <th scope="col">Status</th>
                      <th scope="col">Shipping Address</th>
                      <th scope="col">Total Amount</th>
                      <th scope="col">Order Date</th>
                      <th scope="col">Delivery Date</th>
                      <th scope="col">Actions</th>
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
                   ?.map((c) => (
                        <tr key={c.order_id}>
                          <td>{c.order_id}</td>
                          {/* <td>{c.customer.username}</td> */}
                          <td>{c.status}</td>
                          <td>{c.shipping_address}</td>
                          <td>{c.total_amount}</td>
                          <td>{`${new Date(c.order_date).getDate()}/${new Date(c.order_date).getMonth()}/${new Date(c.order_date).getFullYear()}   ${new Date(c.order_date)?.getHours()}:${new Date(c.order_date)?.getMinutes()}:${new Date(c.order_date)?.getSeconds()}`}</td>
                          <td>{c.delivery_date?`${new Date(c.delivery_date)?.getDate()}/${new Date(c.delivery_date)?.getMonth()}/${new Date(c.delivery_date)?.getFullYear()}    ${new Date(c.delivery_date)?.getHours()}:${new Date(c.delivery_date)?.getMinutes()}:${new Date(c.delivery_date)?.getSeconds()}`:''}</td>
                          <td>
                            <Link to={`/user/single-order/${c.order_id}`}>
                            <button className="btn btn-info ms-2">View</button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">No orders found.</td>
                      </tr>
                    ): <div>Loading...</div>}
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
