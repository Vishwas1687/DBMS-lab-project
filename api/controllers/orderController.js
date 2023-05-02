const OrderModel=require('../models/Order')
const ProductModel=require('../models/Product')
const UserModel=require('../models/User')

const createOrderController=async(req,res)=>{
try{
    const {customer,items,shipping_address,total_amount}=req.body
    if(!customer)
    return res.send({message:'Customer is not entered'})
    if(!items)
    return res.send({message:'Items is not entered'})
    if(!shipping_address)
    return res.send({message:'Shipping address not entered'})
    if(!total_amount)
    return res.send({message:'Total amount not entered'})

    if(items.length===0)
    {
        return res.send({
            message:'No products in cart',
            success:false
        })
    }

    const newOrder=await new OrderModel({
        customer:customer,
        items:items,
        shipping_address:shipping_address,
        total_amount:total_amount
    }).save()

    res.send({
        message:'Order successfully placed',
        success:true,
        newOrder
    })
} catch(error)
   {
      res.send({
        message:'Something went wrong',
        success:false,
        error:error.message
      })
   }
}

const updateOrderController=async(req,res)=>{
    try{
        const {status,delivery_in_hours}=req.body
        const {order_id}=req.params
        if(!status)
        return res.send({message:'Enter status'})
        if(!delivery_in_hours)
        return res.send({message:'Delivery date is changed'})
        if(!order_id)
        return res.send({message:'Enter order id'})
   
        const existingOrder=await OrderModel.findOne({order_id})

        if(!existingOrder)
        {
            return res.send({
                message:'Order does not exist to update',
                success:false
            })
        }

        const updatedOrder=await OrderModel.findOneAndUpdate(existingOrder._id,{
            $set:{delivery_date:new Date(delivery_in_hours * 60 * 60 * 1000+Date.now()),status:status}
        })

        res.send({
            message:'Order successfully updated',
            success:true,
            updatedOrder
        })

    }catch(error)
    {
         res.send({
            message:'Something went wrong',
            success:false,
            error:error.message
         })
    }
}

const deleteOrderController=async(req,res)=>{
    try{
        const {order_id}=req.params
        if(!order_id)
        return res.send({message:'Enter order id'})

        const existingOrder=await OrderModel.findOne({order_id})
        if(!existingOrder)
        {
            return res.send({
                message:'Order does not exist',
                success:false
            })
        }

        await OrderModel.findByIdAndDelete(existingOrder._id)

        res.send({
            message:'Order has been successfully deleted',
            success:true
        })
    }catch(error)
    {
        res.send({
            message:'Something went wrong',
            success:false,
            error:error.message
        })
    }
}

const getAllOrdersController=async(req,res)=>{
    try{
        const orders=await OrderModel.find({}).populate('customer').populate('items.product')
        if(orders.length===0)
        {
            return res.send({
                message:'No orders left',
                success:false
            })
        }

        res.send({
            message:'All orders are fetched',
            success:true,
            orders
        })

    }catch(error)
    {
         res.send({
            message:'Something went wrong',
            success:false,
            error:error.message
         })
    }
}

const getSingleOrderController=async(req,res)=>{
    try{
       const {order_id}=req.params
       if(!order_id)
       return res.send({message:'Order Id is not entered'})

       const singleOrder=await OrderModel.findOne({order_id}).populate('customer').populate('items.product')

       if(!singleOrder)
       {
        return res.send({
            message:'The order id does not exist',
            success:false
        })
       }

       res.send({
        message:'Order successfully fetched',
        success:true,
        singleOrder
       })
    }catch(error)
    {
         res.send({
            message:'Something went wrong',
            success:false,
            error:error.message
         })
    }
}

const getOrderByUserController=async(req,res)=>{
    try{
        const {customer_id}=req.params
        if(!customer_id)
        return res.send({message:'Enter the customer id'})

        const user=await UserModel.findOne({user_id:customer_id})
        if(!user)
        {
            return res.send({
                message:'User does not exist',
                success:false
            })
        }
        // const thirtyDaysToGo=new Date(Date.now()-30*24*60*60*1000)
        const order=await OrderModel.find({customer:user._id,
         }).populate('items.product').populate('customer')
        if(order.length===0)
        {
            return res.send({
                message:'User does not have any order',
                success:true
            })
        }
        return res.send({
            message:`All orders of the user ${user.username} is fetched`,
            success:true,
            order
        })
    }catch(error)
    {
         return res.send({
            message:'Something went wrong',
            success:false,
            error:error.message
         })
    }
}

const getPlacedOrdersController=async(req,res)=>{
    try{
        const order=await OrderModel.find({status:'placed'}).populate('items.product').populate('customer')
        if(order.length===0)
        {
            return res.send({
                message:'Do not have any pending orders',
                success:true
            })
        }
        return res.send({
            message:`All pending orders are fetched`,
            success:true,
            order
        })
    }catch(error)
    {
         return res.send({
            message:'Something went wrong',
            success:false,
            error:error.message
         })
    }
}

const getDeliveredOrdersController=async(req,res)=>
{
   try{
        const order=await OrderModel.find({status:'delivered'}).populate('items.product').populate('customer')
        if(order.length===0)
        {
            return res.send({
                message:'Do not have any delivered orders',
                success:true
            })
        }
        return res.send({
            message:`All delivered orders are fetched`,
            success:true,
            order
        })
    }catch(error)
    {
         return res.send({
            message:'Something went wrong',
            success:false,
            error:error.message
         })
    }
}

const getCancelledOrdersController=async(req,res)=>
{
   try{
        const order=await OrderModel.find({status:'cancelled'}).populate('items.product').populate('customer')
        if(order.length===0)
        {
            return res.send({
                message:'Do not have any cancelled orders',
                success:true
            })
        }
        return res.send({
            message:`All cancelled orders are fetched`,
            success:true,
            order
        })
    }catch(error)
    {
         return res.send({
            message:'Something went wrong',
            success:false,
            error:error.message
         })
    }
}

const createFeedbackController=async(req,res)=>{
    try{
         const {rating,title,body,is_flagged,flag_reason}=req.body
         const {order_id,user_id,slug}=req.params
         if(!rating)
         return res.send({message:'Enter rating'})
         if(!title)
         return res.send({message:'Enter title'})
         if(!body)
         return res.send({message:'Enter body'})
         if(!is_flagged)
         return res.send({message:'Enter flag or not'})
         if(!flag_reason)
         return res.send({message:'Enter flag reason'})

         const user=await UserModel.findOne({user_id})
         const order=await OrderModel.findOne({customer:user._id,order_id:order_id})
         const product=await ProductModel.findOne({slug})
         
       
         let feedbackProduct=order.items.find((pro)=>pro.product.toString()===product._id.toString())

         if(feedbackProduct.feedback_given)
         {
            return res.send({
                message:'User has already given the feedback',
                success:false
            })
         }

         feedbackProduct={...feedbackProduct,feedback:{
               user:user._id,
               product:product._id,
               order_id:order._id,
               rating:rating,
               title:title,
               body:body,
               is_flagged:is_flagged,
               flag_reason:flag_reason
         }}

         const feedback=feedbackProduct.feedback

         const updatedOrder=await OrderModel.findOneAndUpdate({customer:user._id,order_id:order_id,
           "items.product":product._id},{$set:{"items.$.feedback":feedback},"items.$.feedback_given":true},{new:true})

         return res.send({
            message:`Feedback of the product ${product.slug} is received from the user ${user.username} for the order ${order.order_id}`,
            success:true,
            updatedOrder
         })

    }catch(error)
    {
        res.send({
            message:'Something went wrong',
            success:false,
            error:error.message
        })
    }
}
module.exports={createOrderController,updateOrderController,
   deleteOrderController,getAllOrdersController,getSingleOrderController,
   getOrderByUserController,getPlacedOrdersController,getDeliveredOrdersController,
     getCancelledOrdersController,createFeedbackController}