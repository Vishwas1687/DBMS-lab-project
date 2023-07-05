import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import {Link} from 'react-router-dom'
import AdminMenu from "./../../components/AdminMenu";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import CategoryForm from '../../components/Form/CategoryForm';
import Modal from 'antd/es/modal/Modal';
import toast from "react-hot-toast";
import axios from "axios";
import '../../components/styles/ProductPage.css'
import {baseUrl} from '../../baseUrl'

const AdminOrders = () => {

  const [orders, setOrders] = useState([]);
  const [visible,setVisible]=useState(false);
  const [status,setStatus]=useState('');
  const [deliveryTime,setDeliveryTime]=useState('')
  const [selectedOrder, setSelectedOrder] = useState('');
  const [editStatus, setEditStatus] = useState("");
  const [orderSearch,setOrderSearch]=useState('')
  const [loading,setLoading] = useState(false);

    const getAllOrders = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(
            `${baseUrl}/api/orders/get-all-orders`
          );
          if (data?.success) {
            setOrders(data?.orders);
          }
          setLoading(false);
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
            `${baseUrl}/api/orders/delete-order/${order_id}`
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
            `${baseUrl}/api/orders/update-order/${selectedOrder.order_id}`,
            { status: status,delivery_in_hours:parseInt(deliveryTime) }
          );
          if (data.success) {
            toast.success("Order updated successfully");
            setVisible(false)
            getAllOrders();

          } else {
            toast.error(data.message);
            setVisible(false)
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
  // fontWeight:'bold'
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
    <>
    <Layout title={"DashBoard - Manage Category"}>
    <div className="container-fluid dashboard">
    <div className="row">
    <div className="col-md-3"  style={{'margin-top':'2rem'}}>
    <AdminMenu />

    </div>
    <div className="col-md-9" style={{'margin-top':'2rem'}}>
    <h1>Orders</h1>
    <br></br>

    <div className='search'>
        <div className='searchInput mb-3' style={{'border':'1px solid #111','width':'25%'}}>
          <input type="text" value={orderSearch}
          placeholder="Enter order info..." onChange={(e)=>setOrderSearch(e.target.value)}/>
                 
         <div className="searchIcon">
          {orderSearch ? <AiOutlineClose style={{'font-size':'1.5rem'}} id="clearBtn" onClick={()=>{setOrderSearch("")}}/> :  <BiSearch style={{'font-size':'1.5rem'}}/>}
          </div>
      </div>
    </div>
      
    <div>
    <table className="table">
    <thead>

    <tr>
    <th style={tableHeaderStyle} scope="col">Order ID</th>
    <th style={tableHeaderStyle} scope="col">Customer</th>
    {/* <th scope="col">Payment</th> */}
    <th style={tableHeaderStyle} scope="col">Status</th>
    <th style={tableHeaderStyle} scope="col">Shipping Address</th>
    <th style={tableHeaderStyle} scope="col">Total Amount</th>
    <th style={tableHeaderStyle} scope="col">Order Date</th>
    <th style={tableHeaderStyle} scope="col">Delivery Date</th>
    <th style={tableHeaderStyle} scope="col">Actions</th>
    </tr>
    </thead>

    <tbody>
        { !loading ? orders?.filter((c)=>{
                        
                    if (orderSearch === '') return c;
                   else {
                    const formattedOrderDate = `${new Date(c.order_date).getDate()}/${new Date(c.order_date).getMonth()}/${new Date(c.order_date).getFullYear()} ${new Date(c.order_date).getHours()}:${new Date(c.order_date).getMinutes()}:${new Date(c.order_date).getSeconds()}`;
                    const deliveredOrderDate = `${new Date(c.delivery_date).getDate()}/${new Date(c.delivery_date).getMonth()}/${new Date(c.delivery_date).getFullYear()} ${new Date(c.delivery_date).getHours()}:${new Date(c.delivery_date).getMinutes()}:${new Date(c.delivery_date).getSeconds()}`;
                   return (
                  c.status.toLowerCase().includes(orderSearch.toLowerCase()) ||
                  c.customer.username.toLowerCase().includes(orderSearch.toLowerCase())||
                  deliveredOrderDate.toLowerCase().includes(orderSearch.toLowerCase()) ||
                  formattedOrderDate.toLowerCase().includes(orderSearch.toLowerCase()) ||
                  c.order_id.toLowerCase().includes(orderSearch.toLowerCase()) ||
                  c.shipping_address.toLowerCase().includes(orderSearch.toLowerCase())||
                  c.total_amount.toString().includes(orderSearch)
      );
    }
                  })
                   ?.map((c,index) => (
            <>
            <tr key={c.order_id} style={{backgroundColor:index%2==1?'#4CAF50':'#3CB371'}}>
            <td style={tableCellStyle}>{c.order_id}</td>
            <td style={tableCellStyle}>{c.customer.username}</td>
            {/* <td>{c.payment}</td> */}
            <td style={tableCellStyle}>{c.status}</td>
            <td style={tableCellStyle}>{c.shipping_address}</td>
            <td style={tableCellStyle}>{c.total_amount}</td>
            <td style={tableCellStyle}>{`${new Date(c.order_date).getDate()}/${new Date(c.order_date).getMonth()}/${new Date(c.order_date).getFullYear()}   ${new Date(c.order_date)?.getHours()}:${new Date(c.order_date)?.getMinutes()}:${new Date(c.order_date)?.getSeconds()}`}</td>
            <td style={tableCellStyle}>{c.delivery_date?`${new Date(c.delivery_date)?.getDate()}/${new Date(c.delivery_date)?.getMonth()}/${new Date(c.delivery_date)?.getFullYear()}    ${new Date(c.delivery_date)?.getHours()}:${new Date(c.delivery_date)?.getMinutes()}:${new Date(c.delivery_date)?.getSeconds()}`:''}</td>
            <td style={tableCellStyle}>
            <button
              className="btn btn-primary ms-2"
              onClick={(e)=>{setStatus(c.status);
                setSelectedOrder(c)
               setVisible(true)}}     
               style={editButtonStyle}      
             >
              Edit
              </button>
            <Link to={`/admin/single-order/${c.order_id}`}>         
            <button className="btn btn-info ms-2" style={viewButtonStyle}>
                View
            </button>
            </Link>    
            <Link>
            <button className="btn btn-danger ms-2"
            style={deleteButtonStyle}
            onClick={() => {
              handleDelete(c.order_id);
            }}>
                Delete
            </button>
            </Link>
            </td>
            </tr>
            </>
        )): <tr>
          <td colspan='8' className='myLoad'style={{height:100+'px',background:'lightgray',animation:'flicker 1s infinite'}}><div style={{display:'flex',height:100+'%',alignItems:'center',justifyContent:'center'}}>Loading...</div></td>
          </tr>}


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
            <option value='placed'>Placed</option>
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
