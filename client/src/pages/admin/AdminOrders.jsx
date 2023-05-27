import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import {Link} from 'react-router-dom'
import AdminMenu from "./../../components/AdminMenu";
import CategoryForm from '../../components/Form/CategoryForm';
import Modal from 'antd/es/modal/Modal';
import toast from "react-hot-toast";
import axios from "axios";

const AdminOrders = () => {

  const [orders, setOrders] = useState([]);
  const [visible,setVisible]=useState(false);
  const [status,setStatus]=useState('');
  const [deliveryTime,setDeliveryTime]=useState('')
  const [selectedOrder, setSelectedOrder] = useState('');
  const [editStatus, setEditStatus] = useState("");

    const getAllOrders = async () => {
        try {
          const { data } = await axios.get(
            "http://localhost:5000/api/orders/get-all-orders"
          );
          if (data?.success) {
            setOrders(data?.orders);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong in getting orders");
        }
      };

      useEffect(() => {
        getAllOrders();
      }, []);

      const handleDelete = async (order_id) => {
        try {
          const { data } = await axios.delete(
            `http://localhost:5000/api/orders/delete-order/${order_id}`
          );
          if (data.success) {
            toast.success(`order is deleted`);
    
            getAllOrders();
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      };

      const handleEdit = async (e) => {
        e.preventDefault()
        try {
          const { data } = await axios.put(
            `http://localhost:5000/api/orders/update-order/${selectedOrder.order_id}`,
            { status: status,delivery_in_hours:parseInt(deliveryTime) }
          );
          if (data.success) {
            toast.success("Order updated successfully");
            setVisible(false)
            getAllOrders();

          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error("Something went wrong");
        } finally {
          setSelectedOrder(null);
          setEditStatus("");
        }
      };
    
      const handleEditModalOpen = (order) => {
        setSelectedOrder(order);
        setEditStatus(order.status);
      };
    


  return (
    <>
    <Layout title={"DashBoard - Manage Category"}>
    <div className="container-fluid m-3 p-3 dashboard">
    <div className="row">
    <div className="col-md-3">
    <AdminMenu />

    </div>
    <div className="col-md-9">
    <h1>Orders</h1>
    <br></br>
    <div>
    <table className="table">
    <thead>

    <tr>
    <th scope="col">Order ID</th>
    <th scope="col">Customer</th>
    {/* <th scope="col">Payment</th> */}
    <th scope="col">Status</th>
    <th scope="col">Shipping Address</th>
    <th scope="col">Total Amount</th>
    <th scope="col">Order Date</th>
    <th scope="col">Delivery Date</th>
    <th scope="col">Actions</th>
    </tr>
    </thead>

    <tbody>
        {orders.map((c) => (

            <>
            <tr key={c.order_id}>
            <td>{c.order_id}</td>
            <td>{c.customer.username}</td>
            {/* <td>{c.payment}</td> */}
            <td>{c.status}</td>
            <td>{c.shipping_address}</td>
            <td>{c.total_amount}</td>
            <td>{`${new Date(c.order_date).getDate()}/${new Date(c.order_date).getMonth()}/${new Date(c.order_date).getFullYear()}   ${new Date(c.order_date)?.getHours()}:${new Date(c.order_date)?.getMinutes()}:${new Date(c.order_date)?.getSeconds()}`}</td>
            <td>{c.delivery_date?`${new Date(c.delivery_date)?.getDate()}/${new Date(c.delivery_date)?.getMonth()}/${new Date(c.delivery_date)?.getFullYear()}    ${new Date(c.delivery_date)?.getHours()}:${new Date(c.delivery_date)?.getMinutes()}:${new Date(c.delivery_date)?.getSeconds()}`:''}</td>
            <td>
            <button
              className="btn btn-primary ms-2"
              onClick={(e)=>{setStatus(c.status);
                setSelectedOrder(c)
               setVisible(true)}}           
             >
              Edit
              </button>
            <Link to={`/admin/single-order/${c.order_id}`}>         
            <button className="btn btn-info ms-2">
                View
            </button>
            </Link>    

            <button className="btn btn-danger ms-2"
            onClick={() => {
              handleDelete(c.order_id);
            }}>
                Delete
            </button>
            </td>
            </tr>
            </>
        ))}


    </tbody>
    </table>
    </div>

    <Modal
  onCancel={() => setVisible(false)}
  footer={null}
  visible={visible}
>
   
   <form onSubmit={handleEdit}>
        <div className="mb-3">
          <br></br>
          <label style={{'font-size':'1.3rem'}}>Status</label>
          <br></br>
          <select value={status} onChange={(e)=>setStatus(e.target.value)}
          style={{height:'3rem','font-size':'1.5rem','width':'10rem',cursor:'pointer'}}>
            <option value='shipping'>shipping</option>
            <option value='delivered'>delivered</option>
          </select>
          <br></br>
          <label style={{'font-size':'1.3rem'}}>Delivery in hours</label>
          <input
            type="text"
            className="form-control"
            placeholder={`Enter delivery time in hours`}
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>


  
</Modal>

    </div>
    </div>
    </div>

    </Layout>

      
    </>
  )
}

export default AdminOrders
