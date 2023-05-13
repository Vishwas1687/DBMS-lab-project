import axios from 'axios';
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageNotFound from './PageNotFound'
import Header from '../components/Layout/Header';

const ProductPage = () => {
  const { productName } = useParams();
  const [info, setInfo] = useState({})
  const [found,setFound] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        const {data} = await axios.get(`http://localhost:5000/api/products/get-products-by-search/${productName}`);
        if (data.message === 'No products found') setFound(false);
    };
    fetchData();
  }, [productName]);

  return (
    <>
    {found ? <>
    <Header />
    <div>{productName}</div>
    
    </> : <PageNotFound />}
    
    </>
  )
}

export default ProductPage