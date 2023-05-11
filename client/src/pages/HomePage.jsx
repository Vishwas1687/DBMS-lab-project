import React from 'react'
import {useState, useEffect} from 'react'
import Header from '../components/Layout/Header'
import {useAuth} from '../context/auth'
import Card from '../components/Layout/Card'
import '../components/styles/Card.css'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link,useNavigate } from 'react-router-dom';


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate=useNavigate()

   const getAllProducts=async()=>{
    try{
        const {data}=await axios.get('http://localhost:5000/api/products/all-products')
        setProducts(data.products)
        //console.log(data)
    }
    catch(error)
    {
        toast.error(error)
    }
   }
   //console.log(products)

  // Fetch products from backend on initial load
  useEffect(() => {
      getAllProducts()
      //console.log(products)
    },[]);

    const Products = products.map(item =>{
      return(
        <Card 
          key={item.product_id}
          {...item}
        />
      )
    })

  return (
    <div>
      <Header />
      <div className='cards-list'>
        {Products}
      </div>
    </div>
  )
}

export default HomePage
