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
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [relatedProducts,setRelatedProducts] = useState([]);
  const [sameBrand,setSameBrand] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
        try{
            const {data} = await axios.get(`http://localhost:5000/api/products/get-single-product/${slug}`);
            const brand = data.existingProduct.brand._id;
            const subcat = data.existingProduct.subcategory;
            const temp = await axios.get(`http://localhost:5000/api/products/get-related-products-of-the-subcategory/${slug}/`);
            const tempBrand = await axios.get(`http://localhost:5000/api/products/get-products-based-on-brand-and-subcategory-other-than-current-product/${brand}/${subcat}/${slug}`);

            setRelatedProducts(temp.data.products);
            setSameBrand(tempBrand.data.products);
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

  useEffect(() => {
  }, [relatedProducts,sameBrand])
  
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
            <div className='details'>
                <div className='brandName_'>{info.brand.brand_name}</div>
                <div className='productName_'>{info.product_name}</div>
                <div className='catSub'><span className='product_cat'>{info.category.category_name}</span>•<span className='product_subcat'>{info.subcategory}</span></div>
                <div className="mrp_">MRP: <s>Rs.{info.weights[selectedWeight].mrp}</s></div>
                <div className="sp_">PRICE: Rs.{info.weights[selectedWeight].sp}</div>
                <div className='weightS'>
                    <div>
                        Select quantity:
                    </div>
                    <select onChange={e => setSelectedWeight(e.target.value)}>
                        {info ? info.weights.map((weight,index)=>{
                            return <>
                                <option value={index} key={index}>{weight.weight} {weight.weight_units}</option>
                            </>
                        }) : ""}
                    </select>
                </div>
                <div className='addTC'>
                    <button>Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
                        <hr></hr>

    <div className="related">
        <h3>Related Products</h3>
        <div className="productSlider">
            {
                (relatedProducts.length) ? 
                relatedProducts.map((product,index)=>(
                        <div className="card__" key={index}>
  <img src={`http://localhost:5000/api/products/get-photo/${product.slug}`} className="card-img_" alt="..." />
  <div className="card-body">
    <h5 className="card-title" style={{textTransform:'capitalize'}}>{product.product_name}</h5>
    <a href={`/product/${product.slug}`} className="btn btn-primary">Buy</a>
  </div>
</div>
                ))
                 : <>No products found...</>
            }
        
        </div>
    </div>

    <hr></hr>

    <div className="related brand">
        <h3>Similar products by {info.brand.brand_name}</h3>
        <div className="productSlider">
            {
                (sameBrand.length) ? 
                sameBrand.map((product,index)=>(
                        <div className="card__" key={index}>
  <img src={`http://localhost:5000/api/products/get-photo/${product.slug}`} className="card-img_" alt="..." />
  <div className="card-body">
    <h5 className="card-title" style={{textTransform:'capitalize'}}>{product.product_name}</h5>
    <a href={`/product/${product.slug}`} className="btn btn-primary">Buy</a>
  </div>
</div>
                ))
                 : <>No products found...</>
            }
        
        </div>
    </div>

    
    </> : <PageNotFound />}
    
    </>
  )
}

export default ProductPage