import React from 'react'
import '../styles/Card.css'
import { Drop, X } from 'phosphor-react'
import Dropdown from 'react-dropdown'
import {useState} from 'react'
import { useEffect } from 'react'
import { useCart } from '../../context/cart'
import { toast } from 'react-hot-toast'


export default function(props){

    //console.log(props)
    const weights = props.weights

    const options = weights.map(item =>{
        return(
            <option value={item.weight_id}>{item.weight} {item.weight_units}</option>
        )
    })

    const [cart, setCart] = useCart([])
    const [selectedWeight, setSelectedWeight] = useState(weights[0].weight_id)
    const [sp, setSp] = useState(weights[0].sp)
    const [mrp, setMrp] = useState(weights[0].mrp)
    const [stock, setStock] = useState((weights[0].stock) > 0 ? true : false)

    const [quantity, setQuantity] = useState(0)

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

    

    // const imgStr = `http://localhost:5000/api/products/get-photo/${props.slug}`
    // console.log(imgStr)
    


    
    return(
            // <div className="card">
            //     <img 
            //         className="card--image" 
            //         src= {`http://localhost:5000/api/products/get-photo/${props.slug}`}
            //     />
            //     <div className="card--content">
            //         <h3 className="card--title">{props.product_name}</h3>
            //         <p className="card--text">
            //             {props.brand.brand_name}
            //             <br/>
            //             {props.category.category_name} • {props.subcategory}
            //         </p>
            //         <h4 className="card--choice">
            //             <label>
            //                 Weight:
            //                 <select 
            //                     name="selectedWeight" 
            //                     value={selectedWeight}
            //                     onChange={e => setSelectedWeight(e.target.value)}
            //                 >
            //                     {options}
            //                 </select>
            //             </label>
            //             <br/>

            //             <h5 className="card--price">
            //                     Selling price: {sp}
            //                     <br/> 
            //                     MRP: {mrp}
            //             </h5>
                        
            //         </h4>
            //     </div>
    
            // </div>

    <div className="card">
        <div className="wrapper">
            <img className="card_img" src = {`http://localhost:5000/api/products/get-photo/${props.slug}` } />

            <div className="cardInfo">
                <h1>{props.product_name}</h1>

                <p className="date_">
                    {props.brand.brand_name}
                    <br/>
                    {props.category.category_name} • {props.subcategory}
                </p>

                <div className="action">
                    <div className="priceGroup">
                        <p className="price old_price">MRP:{mrp}</p>
                        <p className="price newPrice">Price:{sp}</p>
                    </div>
                    
                    <label>
                            Weight:
                            <select 
                                name="selectedWeight" 
                                value={selectedWeight}
                                onChange={e => setSelectedWeight(e.target.value)}
                            >
                                {options}
                            </select>
                    </label> 
                </div>

                <div> 
                    {stock ?
                        <div className="cart">
                            <button type="button" 
                                onClick={() =>
                                    {
                                    setCart([...cart, {product:props,selectedWeight: selectedWeight, sp: sp, mrp: mrp,quantity:parseInt(1)}])
                                    console.log(cart)
                                    localStorage.setItem('cart', JSON.stringify([...cart, {product:props,selectedWeight: selectedWeight, sp: sp, mrp: mrp, quantity: parseInt(1)}]))
                                    toast.success('Item added to cart')
                                }}>
                                {quantity > 0 ? 
                                "+-" : "ADD TO CART"}
                            </button>
                            </div>
                        : "OUT OF STOCK"
                    }   
                </div>
            </div>
        </div>
    </div>
    )
}


