import React from "react"
import Layout from "../components/Layout/Layout"
import { useCart } from "../context/cart"
import { useAuth } from "../context/auth"
import { useNavigate } from "react-router-dom"

const CartPage = () => {
    const [auth, setAuth] = useAuth()
    const [cart, setCart] = useCart()
    const navigate = useNavigate()
    
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





    console.log(cart)


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
                <div className="row">
                    <div className="col-md-9">
                        {
                            cart?.map( p =>(
                                <div className="row mb-2 card flex-row">
                                    <div className="col-md-4">
                                    <img 
                                        className="card_img" 
                                        src = {`http://localhost:5000/api/products/get-photo/${p.product.slug}`}
                                         />
                                    </div>
                                    <div className="col-md-8">{p.product.product_name}</div>
                                    <button className="button" onClick={() => removeCartItem(p.product._id,p.selectedWeight)}> Remove</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="col-md-3 text-center">
                    <h2>Cart Summary</h2>
                    <p>Total|Checkout|Payment</p>
                    <hr/>
                    <p>Total: {totalPrice()}</p>
                    {auth?.user?.address ? (
                    
                        <div className="mb-3">
                            <h4>Current Address</h4>
                            <h5>
                                {auth?.user?.address}
                            </h5>
                            <button className="btn btn-primary"
                            /*onClick={() => navigate('/dashboard/user/profile')}*/>Update Address</button>
                        </div>
                    
                    ) : (
                        <div className="mb-3">
                            {
                                auth?.token ? (
                                    <button onClick={() => navigate('/dashboard/user/profile')}>
                                        update address
                                    </button>
                                ) : (
                                    <button onClick={() => navigate('/login ')}>
                                    Please login to proceed 
                                    </button>
                                )
                            }
                        </div>
                    )}
                    </div>

            </div>
        </Layout>
        )
}

export default CartPage