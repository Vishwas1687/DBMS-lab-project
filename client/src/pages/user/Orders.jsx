import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import {Link} from 'react-router-dom'
import axios from "axios";
import toast from "react-hot-toast";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/orders/get-order-by-user");
        if (data?.success) {
          setOrders(data.order);
          console.log(data)
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      <Layout title={"DashBoard - User Orders"}>
        <div className="container-fluid m-3 p-3 dashboard">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h1>Orders</h1>
              <br />
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
                    {orders && orders.length > 0 ? (
                      orders.map((c) => (
                        <tr key={c.order_id}>
                          <td>{c.order_id}</td>
                          {/* <td>{c.customer.username}</td> */}
                          <td>{c.status}</td>
                          <td>{c.shipping_address}</td>
                          <td>{c.total_amount}</td>
                          <td>{c.order_date}</td>
                          <td>{c.delivery_date}</td>
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
                    )}
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
