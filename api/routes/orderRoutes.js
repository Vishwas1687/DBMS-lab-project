const express=require('express')
const router=express.Router()

const {createOrderController,updateOrderController,
      deleteOrderController,getAllOrdersController,
       getSingleOrderController}=require('../controllers/orderController')

router.post('/create-order',createOrderController)

router.delete('/delete-order/:order_id',deleteOrderController)

router.put('/update-order/:order_id',updateOrderController)

router.get('/get-all-orders',getAllOrdersController)

// router.get('/get-order-by-user/:customer_id',getOrderByUserController)

// router.post('/get-all-orders-by-filters',getAllOrdersByFiltersController)

// router.post('get-user-orders-by-filters/:customer_id',getUserOrdersByFiltersController)

router.get('/get-single-order/:order_id',getSingleOrderController)

// router.get('/get-pending-orders',getPendingOrdersController)

// router.get('/get-delivered-orders',getDeliveredOrdersController)

// router.get('/get-cancelled-orders',getCancelledOrderController)

// router.post('/get-order/:order_id/:user_id/:slug/feedback',createFeedbackController)

// router.get('/get-feedback/:slug',getAllFeedbackOfTheProductController)

// router.get('/get-all-flagged-feedbacks',getAllFlaggedFeedbacks)

// router.get('/get-products-by-feedback-rating',getProductsByFeedbackController)

// router.get('/get-all-products-flagged-as-poor-product-quality',getPoorQualityProductsController)

module.exports=router
