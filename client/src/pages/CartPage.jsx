import React,{useState,useEffect} from "react"
import Layout from "../components/Layout/Layout"
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import toast from 'react-hot-toast'
import { useCart } from "../context/cart"
import { useAuth } from "../context/auth"
import { useNavigate ,Link} from "react-router-dom"
import "../components/styles/Cart.css"

const CartPage = () => {
    const [auth, setAuth] = useAuth()
    const [loading,setLoading]=useState(false)
    const [cart, setCart] = useCart()
    const [clientToken,setClientToken]=useState('')
    const [instance,setInstance]=useState('')
    const navigate = useNavigate()
    const [order,setOrder]=useState([])
    const [singleProduct,setSingleProduct]=useState({
        product:null,
        quantity:1,
        weight:'',
        weight_units:'',
        price:''
    })
    
    const totalPrice = () => {
        try {
            let total = 0
            cart?.map((item) => {
                total = total + item.sp
            })
            return total
        } catch (error) {
            
        }
    }

    console.log(cart)

    const removeCartItem = (pid, w_id) =>{
        try{
            let myCart = [...cart]
            let index = myCart.findIndex(item => item.product._id === pid && item.selectedWeight === w_id) 
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch(error){
            console.log(error)
        }
    }

  const getToken = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/orders/braintree/token");
      console.log(data)
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);


  //handle payments
  const handlePayment = async () => {
    try {
        const updatedOrder=cart.map((item)=>{
              console.log("Item: ", item);
            const weight=item.product.weights.filter((selWeight)=>selWeight.weight_id===parseInt(item.selectedWeight))[0].weight
            const weight_units=item.product.weights.filter((selWeight)=>selWeight.weight_id===parseInt(item.selectedWeight))[0].weight_units
            
            const updatedProduct={
              product:item.product._id,
              quantity:item.quantity,
              price:item.sp,
              weight:weight,
              weight_units:weight_units
            }
            console.log("Updated Product: ", updatedProduct);
            return updatedProduct
        })
        console.log("Updated Order: ", updatedOrder);

      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("http://localhost:5000/api/orders/create-order", {
        nonce,
        products:updatedOrder,
        shipping_address:auth?.user?.address,
        total_price:totalPrice()
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


   useEffect(()=>{
    console.log(order)
   },[]
   )


    return (
        
        <Layout>
            <div className="cont">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center bg-light p-2 mb-1">
                            {cart.length > 0 ?
                                `You have ${cart.length} items in your cart ${
                                    auth?.token ? "" : "please login to continue"
                                }` :
                                "Your cart is empty"
                            }
                        </h2>
                    </div>
                </div>
                <div className="cart-container">
                    <div className="cart-items">
                        {
                            cart?.map( p =>(
                              <div className="cart-item">
                              <div className="cart-item-image"
                                style={{textAlign: "center", width: "100%", height: "150px", overflow: "hidden"}}
                              >
                                  <img style={{maxWidth: "100%", maxHeight: "100%", objectFit: "contain"} }
                                  src = {`http://localhost:5000/api/products/get-photo/${p.product.slug}`}
                                   />
                              </div>
                              <div className="cart-item-details">
                                  <h3>{p.product.product_name}</h3>
                                  <p>MRP: {p.mrp}</p>
                                  <p>Selling Price: {p.sp}</p>
                                  <p>Quantity: {p.quantity}</p>
                                </div>
                              <button className="remove-button" onClick={() => removeCartItem(p.product._id,p.selectedWeight)}> Remove</button>
                          </div>
                            ))
                        }
                    </div>
                
                <div className="cart-summary">
                    <h2>Cart Summary</h2>
                    <p>Total|Checkout|Payment</p>
                    <hr style={{width: "200px"}}/>
                    <h1>Total: {totalPrice()}</h1>
                    {auth?.user?.address ? (
                    
                        <div className="mb-3">
                            <h4>Current Address</h4>
                            <h5>
                                {auth?.user?.address}
                            </h5>
                            <button className="btn btn-primary"
                            onClick={() => navigate('/user/update-profile')}>Update Address</button>
                        </div>
                    
                    ) : (
                        <div className="mb-3">
                            {
                                auth?.token ? (
                                  <Link to={`/user/update-profile`}>
                                    <button type="button" className="btn btn-primary">
                                        update address
                                    </button>
                                       
                                  </Link>
                                    
                                ) : (
                                  <Link to={'/'}>
                                      <button type="button" className="btn btn-primary">
                                        Please login to proceed
                                      </button>
                                  </Link>
                                    
                                )
                            }
                        </div>
                    )}
                    
                    

                <div >
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
              </div>
              </div>

            </div>
        </Layout>
        )
}

export default CartPage