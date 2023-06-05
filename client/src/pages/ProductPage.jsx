import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import '../components/styles/ProductPage.css';
import '../components/styles/Card.css'
import { useCart } from '../context/cart';
import { useQuantityLocal } from '../context/quantity';
import { ShoppingBagOpen } from 'phosphor-react';
import toast from 'react-hot-toast'

const ProductPage = () => {
    const [cart, setCart] = useCart([])
    const [quantityLocal,setQuantityLocal]=useQuantityLocal([])
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [found, setFound] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [sameBrand, setSameBrand] = useState([]);
  const [temp,setTemp]=useState('')
  const [weights,setWeights]=useState([])
  const [stock, setStock] = useState('')
  const [weight,setWeight]=useState('')
  const [weightUnits,setWeightUnits]=useState('')
  const [sp, setSp] = useState('')
  const [mrp, setMrp] = useState('')

  const [quantity, setQuantity] = useState('')


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/products/get-single-product/${slug}`
        );
        const brand = data.existingProduct.brand._id;
        const subcat = data.existingProduct.subcategory;
        const temp = await axios.get(
          `http://localhost:5000/api/products/get-related-products-of-the-subcategory/${slug}/`
        );
        const tempBrand = await axios.get(
          `http://localhost:5000/api/products/get-products-based-on-brand-and-subcategory-other-than-current-product/${brand}/${subcat}/${slug}`
        );
        setRelatedProducts(temp.data.products);
        setSameBrand(tempBrand.data.products);
        if (!data.success) {
          setFound(false);
          setInfo({});
        } else {
          setInfo(data.existingProduct);
          setFound(true);
          setWeight(data.existingProduct.weights[0]?.weight)
          setMrp(data.existingProduct.weights[0]?.mrp)
          setSp(data.existingProduct.weights[0]?.sp)
          setWeights(data.existingProduct?.weights)
          setWeightUnits(data.existingProduct.weights[0]?.weight_units)
          setSelectedWeight(data.existingProduct.weights[0]?.weight_id)
          setStock((data.existingProduct.weights[0]?.stock>0)?true:false)
          setQuantity(parseInt(quantityLocal.map((quant)=>{
            if(quant.product===data.existingProduct?._id && quant.selectedWeight===data.existingProduct?.weights[0].weight_id)
            return quant.quantity 
        }).join(''))||'')
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [slug]);

  useEffect(()=>{
    const selectedW = info.weights?.find((weight) => weight.weight_id === parseInt(selectedWeight));
     setWeight(selectedW?.weight)
          setMrp(selectedW?.mrp)
          setSp(selectedW?.sp)
          setWeights(selectedW?.weights)
          setWeightUnits(selectedW?.weight_units)
          setQuantity(parseInt(quantityLocal.map((quant)=>{
            if(quant.product===info._id && quant.selectedWeight===parseInt(selectedWeight))
            return quant.quantity 
        }).join(''))||'')
        setTemp('')
  },[selectedWeight])

  const handleWeightChange = (e) => {
    setSelectedWeight(e.target.value);
  };

  const handleDecrement=()=>{
        if(quantity>1)
        {
            setQuantity((quan)=>parseInt(quan)-1)

            const tempCart=cart.filter((cartItem)=>{
                if(cartItem.product._id===info._id && cartItem.selectedWeight===selectedWeight)
                {
                  cartItem.quantity=parseInt(cartItem.quantity)-1
                  return cartItem
                }
                return cartItem
                
            })

            const tempQuantity=quantityLocal.filter((quantLocal)=>{
            if(quantLocal.product===info._id && quantLocal.selectedWeight===selectedWeight)
            {
               quantLocal.quantity=parseInt(quantLocal.quantity)-1
               return quantLocal
            }
            return quantLocal
            
        })
         
         setQuantityLocal(tempQuantity)
         localStorage.setItem('quantityLocal',JSON.stringify(tempQuantity))

            setCart(tempCart)
            localStorage.setItem('cart', JSON.stringify(tempCart))
        }
        else
        {
            setQuantity('')
            const tempQuantity = quantityLocal.filter(quant=>quant.quantity>1)
            setQuantityLocal(tempQuantity)
            setTemp('')

            const tempCart=cart.filter((cartItem)=>cartItem.quantity>1)
            setCart(tempCart)
            localStorage.setItem('cart', JSON.stringify(tempCart))

            setQuantityLocal(tempQuantity)
            localStorage.setItem('quantityLocal',JSON.stringify(tempQuantity))
        }
        

    }

    const handleIncrement=()=>{
        setQuantity((quan)=>parseInt(quan)+1)

        const tempCart=cart.filter((cartItem)=>{
                if(cartItem.product._id===info._id && cartItem.selectedWeight===selectedWeight)
                {
                  cartItem.quantity=parseInt(cartItem.quantity)+1
                  return cartItem
                }
                return cartItem
                
            })

        setCart(tempCart)
        localStorage.setItem('cart', JSON.stringify(tempCart))

        const tempQuantity=quantityLocal.filter((quantLocal)=>{
            if(quantLocal.product===info._id && quantLocal.selectedWeight===selectedWeight)
            {
               quantLocal.quantity=parseInt(quantLocal.quantity)+1
               return quantLocal
            }
            return quantLocal
            
        })
         
         setQuantityLocal(tempQuantity)
         localStorage.setItem('quantityLocal',JSON.stringify(tempQuantity))
    }

  

  return (
    <>
      {found && !loading ? (
        <Layout title={`${slug} product`}>
          <div className='main'>
            <div className='side'>
              <h3>Category</h3>
              <p className='currentCat'>
                {info.category ? info.category.category_name : ""}
              </p>
              {info.category
                ? info.category.subcategories.map((subcat, index) => (
                    <Link
                      key={index}
                      to={`/subcategory/${info.category.slug}/${subcat.subcategory_id}`}
                    >
                      {info.subcategory === subcat.subcategory_name ? (
                        <span className='subcat matchedSubCat'>
                          {subcat.subcategory_name}
                        </span>
                      ) : (
                        <span className='subcat'>{subcat.subcategory_name}</span>
                      )}
                    </Link>
                  ))
                : ""}
              <div className='margin'></div>
              <h3>Brands</h3>
              <p className='brand'>
                {info.brand ? info.brand.brand_name : ""}
              </p>
            </div>
            <div className='product'>
              <img
                className='productImage'
                src={`http://localhost:5000/api/products/get-photo/${info.slug}`}
                alt='Product Image'
              />
              <div className='details'>
                <div className='brandName_'>{info.brand.brand_name}</div>
                <div className='productName_'>{info.product_name}</div>
                <div className='catSub'>
                  <span className='product_cat'>
                    {info.category.category_name}
                  </span>
                  •
                  <span className='product_subcat'>{info.subcategory}</span>
                </div>
                <div className='mrp_'>
                  MRP: <s>Rs.{info.weights.find(weigh=>weigh.weight_id===parseInt(selectedWeight))?.mrp||info.weights[0]?.mrp}</s>
                </div>
                <div className='sp_'>
                  <span style={{'font-size':'1.5rem'}}>PRICE: Rs.{info.weights.find(weigh=>weigh.weight_id===parseInt(selectedWeight))?.sp||info.weights[0]?.sp}</span>
                </div>
                <div className='weightS'>
                  <div style={{'font-size':'1.4rem'}}>Select quantity:</div>
                  <select onChange={handleWeightChange} 
                  style={{width:'14rem','text-align':'center',height:'3rem',
                  'font-size':'1.5rem','background-color':'white','border':'1px solid #111','cursor':'pointer'}}>
                    {info
                      ? info.weights.map((weight) => (
                          <option
                            value={weight.weight_id}
                            key={weight.weight_id}
                          >
                            {weight.weight} {weight.weight_units} {` - Rs. ${weight.sp}`}
                          </option>
                        ))
                      : ""}
                  </select>
                </div>
                <br />
                <div className="cart">
                            {quantity?
                              <>
                                <span className="quantity-btn">
                                    <span>
                                        <button className="decrement-btn" onClick={handleDecrement}>
                                             -
                                        </button>
                                    </span>
                                    <span style={{'background-color':"yellowgreen",
                                     padding:"0 1rem 0 1rem",border:"1px solid #111"}}>
                                        {`${quantity} in basket`}
                                    </span>
                                    <span>
                                        <button className='increment-btn' onClick={handleIncrement}>
                                            +
                                        </button>
                                    </span>
                                </span>
                              </>:
                              <>
                                <span style={{display:'flex',"align-items":'center',
                                'margin-left':"1rem",width:"30rem"}}>
                                <label style={{border:"1px solid #111",padding:"5px", "font-size":"1.5rem",
                                "background-color":"#ccc","border-radius":"15%"}}> Qty </label>  

                                <input type="text" value={temp} style={{padding:"5px",width:"4rem",height:'3rem',
                                "font-size":'1.5rem','font-weight':'bold',
                                "text-align":"center","margin-right":"6rem","border-radius":"15%"}} 
                                onChange={
                                    (e)=>{setTemp(e.target.value)
                                  }}/>
                                 <button type="button" 
                                className='add_to_cart_btn'
                                disabled={stock===0?true:false}
                                onClick={() =>
                                    {
                                        setQuantity(temp||1)
                                    setCart([...cart, {product:info,selectedWeight:parseInt(selectedWeight), sp: sp, mrp: mrp,weight:weight,weightUnits:weightUnits,quantity:parseInt(temp || 1)}])
                                    setQuantityLocal([...quantityLocal,{product:info._id,selectedWeight:parseInt(selectedWeight),weightUnits:weightUnits,quantity:parseInt(temp || 1)}])
                                    localStorage.setItem('quantityLocal',JSON.stringify([...quantityLocal,{product:info._id,selectedWeight:parseInt(selectedWeight),weightUnits:weightUnits,quantity:parseInt(temp || 1)}]))
                                    console.log(cart)
                                    localStorage.setItem('cart', JSON.stringify([...cart, {product:info,selectedWeight:parseInt(selectedWeight), sp: sp, mrp: mrp,weightUnits:weightUnits, quantity: parseInt(temp || 1)}]))
                                    toast.success('Item added to cart')
                                }}>
                                <span style={{display:'flex','align-items':'center',
                                gap:'0.5rem',"padding-left":"1.8rem"}}>
                                  Add
                                 <ShoppingBagOpen/>
                                 </span>
                            </button>
                                 </span>
                              </>}
                            </div>  
              </div>
            </div>
          </div>
          <hr />
          <div className='related'>
            <h3>{`More products related to ${info.subcategory}`}</h3>
            <div className='productSlider'>
              {relatedProducts.length ? (
                relatedProducts.map((product, index) => (
                  <div className='card__' key={index}>
                    <img
                      src={`http://localhost:5000/api/products/get-photo/${product.slug}`}
                      className='card-img_'
                      alt='...'
                    />
                    <div className='card-body'>
                      <h5 className='card-title my-2' style={{ textTransform: 'capitalize' }}>
                        {product.product_name}
                      </h5>
                      <a href={`/product/${product.slug}`} className='btn btn-primary my-2'>
                        Buy
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <>No products found...</>
              )}
            </div>
          </div>
          <hr />
          <div className='related brand'>
            <h3>Similar products of the brand {info.brand.brand_name}</h3>
            <div className='productSlider'>
              {sameBrand.length ? (
                sameBrand.map((product, index) => (
                  <div className='card__' key={index}>
                    <img
                      src={`http://localhost:5000/api/products/get-photo/${product.slug}`}
                      className='card-img_'
                      alt='...'
                    />
                    <div className='card-body'>
                      <h5 className='card-title my-2' style={{ textTransform: 'capitalize' }}>
                        {product.product_name}
                      </h5>
                      <Link to={`/product/${product.slug}`} className='btn btn-primary my-2'>
                        Buy
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <>No products found...</>
              )}
            </div>
          </div>
          <br></br>
          <br></br>
        </Layout>
      ) : (
        <Layout>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              textAlign: 'center',
            }}
          >
            <div className='spinner-border text-center' role='status'></div>
            <h1 className='text-center'>{`Loading product ${slug}`}</h1>
          </div>
          <br></br>
          <br></br>
        </Layout>
      )}
    </>
  );
};

export default ProductPage;
