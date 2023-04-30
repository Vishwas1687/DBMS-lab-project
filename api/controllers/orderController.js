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
module.exports={createOrderController,updateOrderController,
   deleteOrderController,getAllOrdersController,getSingleOrderController}