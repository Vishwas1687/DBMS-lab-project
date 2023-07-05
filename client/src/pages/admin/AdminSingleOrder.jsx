import axios from 'axios';
import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageNotFound from './../PageNotFound'
import Header from '../../components/Layout/Header';
import '../../components/styles/SingleOrder.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import {baseUrl} from '../../baseUrl'

const SingleOrder = () => {
  const { slug } = useParams();
  const [loading,setLoading]=useState(true);
  const [found,setFound] = useState(false);
  const [info, setInfo] = useState({})
  const [date,setDate] = useState("");
  const navigate = useNavigate();

  const [auth,setAuth]=useAuth();

  useEffect(() => {

    const fetchData = async () => {
        try{
            setLoading(true)
            const {data} = await axios.get(`${baseUrl}/api/orders/get-single-order/${slug}`);
            if (!data.success){
                setFound(false);
                setInfo({});
            }else{
                setInfo(data.singleOrder);
                setFound(true);
            }
            const tempDate = new Date(data.singleOrder.order_date);
                const monthNames = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                  ];
                  
                  // Get the day, month, and year components
                  const day = tempDate.getDate();
                  const monthIndex = tempDate.getMonth();
                  const year = tempDate.getFullYear();
                  
                  // Format the date string
                setDate(`${day} ${monthNames[monthIndex]} ${year}`);
            setLoading(false)

        }catch (error){
            console.log(error);
        }
    };
    fetchData();
  }, [slug]);

  return (
    <>
    {(found && !loading)? <Layout>
        <div className='main__'>
            <div className='flex'>
                <h3>Order Details</h3>
                <p><span>Ordered on {date}</span><span className='divider'>|</span><span>Order #{info.order_id}</span></p>
            </div>
            <div className='ship'>
                <div>
                    <h4>Shipping Details</h4>
                    <div><strong>Customer name: </strong> {info.customer.username}</div>
                    <div><strong>Shipping address: </strong>: {info.shipping_address}</div>
                    <div><strong>Order Status: </strong>: {info.status}</div>
                </div>
            </div>
            <div className='orderDetails'>
            <h4>Order Details</h4>

                {info.items.length ? 
                info.items.map((item,index)=>(
                    <div className='orderItem' key={index}>
                <img src={`${baseUrl}/api/products/get-photo/${item.product.slug}`} alt='..'/>
                <span>{item.product.product_name}</span>
                <span>Quantity: {item.quantity}</span>
                <span>Weight: {item.weight} {item.weight_units}</span>
                <span>Price: Rs.{item.price}</span>
                </div> 
                )) : navigate("/")
                }
                <div className='total'><strong>Total: </strong>Rs.{info.total_amount}</div>
            </div>

        </div>
    </Layout>: <Layout>
        <div style={{position:'absolute',top:'50%',left:"50%",transform:"translate(-50%,-50%)",textAlign:"center"}}>
        <div className="spinner-border text-center" role="status"></div>
          <h1 className='text-center'>{'Loading'}.</h1>
          </div>
        </Layout>}
    
    </>
  )
}

export default SingleOrder;