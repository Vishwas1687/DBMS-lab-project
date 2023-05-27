import axios from 'axios';
import React from 'react'
import {Link} from 'react-router-dom';
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../components/styles/ProductPage.css'

const ProductPage = () => {
  const { slug } = useParams();
  const [loading,setLoading]=useState(true)
  const [info, setInfo] = useState({})
  const [found,setFound] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [relatedProducts,setRelatedProducts] = useState([]);
  const [sameBrand,setSameBrand] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
        try{
            setLoading(true)
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
            setLoading(false)

        }catch (error){
            console.log(error);
        }
    };
    fetchData();
  }, [slug]);

  
  return (
    <>
    {(found && !loading)? <Layout title={`${slug} product`}>
    <div className='main'>
        <div className='side'>
            <h3>Category</h3>
            <p className='currentCat'>{ info.category ? info.category.category_name : ""}</p>
            { (info.category) ? 
                info.category.subcategories.map((subcat,index) => (
                    <Link key={index} to={`/subcategory/${info.category.category_name}/${subcat.subcategory_id}`}>
                    {(info.subcategory === subcat.subcategory_name) ? 
                    <span  className='subcat matchedSubCat'>
                        {subcat.subcategory_name}</span>
                    : <span className='subcat'>{subcat.subcategory_name}</span>}
                    </Link>
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
            </div>
        </div>
    </div>
                        <hr></hr>

    <div className="related">
        <h3>{`More products related to ${info.subcategory}`}</h3>
        <div className="productSlider">
            {
                (relatedProducts.length) ? 
                relatedProducts.map((product,index)=>(
                        <div className="card__" key={index}>
  <img src={`http://localhost:5000/api/products/get-photo/${product.slug}`} className="card-img_" alt="..." />
  <div className="card-body">
    <h5 className="card-title my-2" style={{textTransform:'capitalize'}}>{product.product_name}</h5>
    <a href={`/product/${product.slug}`} className="btn btn-primary my-2">Buy</a>
  </div>
</div>
                ))
                 : <>No products found...</>
            }
        
        </div>
    </div>

    <hr></hr>

    <div className="related brand">
        <h3>Similiar products of the brand {info.brand.brand_name}</h3>
        <div className="productSlider">
            {
                (sameBrand.length) ? 
                sameBrand.map((product,index)=>(
                        <div className="card__" key={index}>
  <img src={`http://localhost:5000/api/products/get-photo/${product.slug}`} className="card-img_" alt="..." />
  <div className="card-body">
    <h5 className="card-title my-2" style={{textTransform:'capitalize'}}>{product.product_name}</h5>
    <Link to={`/product/${product.slug}`} className="btn btn-primary my-2">Buy</Link>
  </div>
</div>
                ))
                 : <>No products found...</>
            }
        
        </div>
    </div>

    
    </Layout> : <Layout>
        <div style={{position:'absolute',top:'50%',left:"50%",transform:"translate(-50%,-50%)",textAlign:"center"}}>
        <div className="spinner-border text-center" role="status"></div>
          <h1 className='text-center'>{`Loading product ${slug}`}.</h1>
          </div>
        </Layout>}
    
    </>
  )
}

export default ProductPage