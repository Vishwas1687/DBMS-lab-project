import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageNotFound from './PageNotFound'
import Header from '../components/Layout/Header';
import '../components/styles/ProductPage.css'

const ProductPage = () => {
  const { slug } = useParams();
  const [info, setInfo] = useState({})
  const [found,setFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try{
            const {data} = await axios.get(`http://localhost:5000/api/products/get-single-product/${slug}`);
            if (!data.success){
                setFound(false);
                setInfo({});
            }else{
                setInfo(data.existingProduct);
                setFound(true);
            }

        }catch (error){
            console.log(error);
        }
    };
    fetchData();
  }, [slug]);


  return (
    <>
    {found ? <>
    <Header />
    <div className='main'>
        <div className='side'>
            <h3>Category</h3>
            <p className='currentCat'>{ info.category ? info.category.category_name : ""}</p>
            { (info.category) ? 
                info.category.subcategories.map((subcat,index) => (
                    <>
                    {(info.subcategory === subcat.subcategory_name) ? <span key={index} className='subcat matchedSubCat'>{subcat.subcategory_name}</span>
                    : <span key={index} className='subcat'>{subcat.subcategory_name}</span>}
                    </>
            ))
             : ""}
             <div className='margin'></div>
             <h3>Brands</h3>
            <p className='brand'>{ info.brand ? info.brand.brand_name : ""}</p>
        </div>
        <div className='product'>
            <img className="productImage" src = {`http://localhost:5000/api/products/get-photo/${info.slug}`} alt='Product Image' />
            <div className='productName_'>{info.product_name}</div>
        </div>
    </div>
    

    
    </> : <PageNotFound />}
    
    </>
  )
}

export default ProductPage