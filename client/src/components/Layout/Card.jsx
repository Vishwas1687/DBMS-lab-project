import React from 'react'
import '../styles/Card.css'
import { Drop, ShoppingBag, ShoppingBagOpen} from 'phosphor-react'
import Dropdown from 'react-dropdown'
import {useState} from 'react'
import { useEffect } from 'react'
import { useCart } from '../../context/cart'
import { useQuantityLocal } from '../../context/quantity'
import { toast } from 'react-hot-toast'
import { FaShoppingBasket } from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'


export default function(props){

    //console.log(props)
    const weights = props.weights

    const options = weights.map(item =>{
        return(
            <option value={item.weight_id}>{item.weight} {item.weight_units} {` - Rs. ${item.sp}`}</option>
        )
    })

    const [cart, setCart] = useCart([])
    const [quantityLocal,setQuantityLocal]=useQuantityLocal([])
    const [selectedWeight, setSelectedWeight] = useState(weights[0].weight_id)
    const [sp, setSp] = useState(weights[0].sp)
    const [mrp, setMrp] = useState(weights[0].mrp)
    const [stock, setStock] = useState((weights[0].stock) > 0 ? true : false)
    const [temp,setTemp]=useState('')
    const navigate=useNavigate()
    const [addtocart,setAddtocart]=useState(false)

    const [quantity, setQuantity] = useState(parseInt(quantityLocal.map((quant)=>{
            if(quant.product===props._id && quant.selectedWeight===props.weights[0])
            return quant.quantity 
        }).join(''))||'')

    useEffect(()=>{
        //console.log(selectedWeight)
        const selectedW = weights.find((weight) => weight.weight_id === parseInt(selectedWeight));
        //console.log(selectedW)
        setSp(selectedW.sp) 

    },[selectedWeight])
    
    useEffect(()=>{
        //console.log(selectedWeight)
        const selectedW = weights.find((weight) => weight.weight_id === parseInt(selectedWeight));
        //console.log(selectedW)
        setMrp(selectedW.mrp) 

    },[selectedWeight])

    useEffect(()=>{
        //console.log(selectedWeight)
        const selectedW = weights.find((weight) => weight.weight_id === parseInt(selectedWeight));
        //console.log(selectedW)
        setStock(selectedW.stock > 0 ? true : false) 

    },[selectedWeight])

    //console.log(stock)

    const handleDecrement=()=>{
        if(quantity>1)
        {
            setQuantity((quan)=>parseInt(quan)-1)

            const tempCart=cart.filter((cartItem)=>{
                if(cartItem.product._id===props._id && cartItem.selectedWeight===selectedWeight)
                {
                  cartItem.quantity=parseInt(cartItem.quantity)-1
                  return cartItem
                }
                return cartItem
                
            })

            const tempQuantity=quantityLocal.filter((quantLocal)=>{
            if(quantLocal.product===props._id && quantLocal.selectedWeight===selectedWeight)
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
                if(cartItem.product._id===props._id && cartItem.selectedWeight===selectedWeight)
                {
                  cartItem.quantity=parseInt(cartItem.quantity)+1
                  return cartItem
                }
                return cartItem
                
            })

        setCart(tempCart)
        localStorage.setItem('cart', JSON.stringify(tempCart))

        const tempQuantity=quantityLocal.filter((quantLocal)=>{
            if(quantLocal.product===props._id && quantLocal.selectedWeight===selectedWeight)
            {
               quantLocal.quantity=parseInt(quantLocal.quantity)+1
               return quantLocal
            }
            return quantLocal
            
        })
         
         setQuantityLocal(tempQuantity)
         localStorage.setItem('quantityLocal',JSON.stringify(tempQuantity))
    }

    useEffect(()=>{
        setQuantity(parseInt(quantityLocal.map((quant)=>{
            if(quant.product===props._id && quant.selectedWeight===selectedWeight)
            return quant.quantity 
        }).join(''))||'')
        setTemp('')
    },[selectedWeight])

 
    return(
            

    <div className="card">
        <div className="wrapper">
            <img className="card_img" src = {`http://localhost:5000/api/products/get-photo/${props.slug}` } 
            style={{cursor:'pointer'}}
             onClick={()=>navigate(`/product/${props.slug}`)}/>

            <div className="cardInfo">
                <h1 style={{cursor:'pointer',"font-size":"1.3rem"}}
             onClick={()=>navigate(`/product/${props.slug}`)}>{props.product_name}</h1>

                <p className="date_" style={{cursor:'pointer',"font-size":"1.3rem"}}
             onClick={()=>navigate(`/product/${props.slug}`)}>
                    {props.brand.brand_name}
                </p>

                
                    
                    <label>
                            <select 
                                name="selectedWeight" 
                                id="weight"
                                value={selectedWeight}
                                onChange={e => {
                                    setSelectedWeight(parseInt(e.target.value))

                                }}
                            >
                                {options}
                            </select>
                    </label> 

                    <div className="action">
                    <div className="priceGroup">
                        <span className="price old_price">MRP:{mrp}</span>
                        <span className="price newPrice">Price:{sp}</span>
                    </div>
                </div>

               
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
                                    setCart([...cart, {product:props,selectedWeight:parseInt(selectedWeight), sp: sp, mrp: mrp,quantity:parseInt(temp || 1)}])
                                    setQuantityLocal([...quantityLocal,{product:props._id,selectedWeight:parseInt(selectedWeight),quantity:parseInt(temp || 1)}])
                                    localStorage.setItem('quantityLocal',JSON.stringify([...quantityLocal,{product:props._id,selectedWeight:parseInt(selectedWeight),quantity:parseInt(temp || 1)}]))
                                    console.log(cart)
                                    localStorage.setItem('cart', JSON.stringify([...cart, {product:props,selectedWeight:parseInt(selectedWeight), sp: sp, mrp: mrp, quantity: parseInt(temp || 1)}]))
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
    )
}


