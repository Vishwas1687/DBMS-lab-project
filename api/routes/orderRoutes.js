const express=require('express')
const router=express.Router()

const {createOrderController,updateOrderController,
      deleteOrderController,getAllOrdersController,
       getSingleOrderController,getOrderByUserController,
       getPlacedOrdersController,getDeliveredOrdersController,
       getCancelledOrdersController,createFeedbackController,
        getAllFeedbackOfTheProductController,getAllFlaggedFeedbackProducts,
         getFlaggedFeedBackController,getPoorQualityFeedbackController,
        getPoorQualityProductsController,deleteFeedbackController}=require('../controllers/orderController')

router.post('/create-order',createOrderController)

router.delete('/delete-order/:order_id',deleteOrderController)

router.put('/update-order/:order_id',updateOrderController)

router.get('/get-all-orders',getAllOrdersController)

router.get('/get-order-by-user/:customer_id',getOrderByUserController)

// router.post('/get-all-orders-by-filters',getAllOrdersByFiltersController)

// router.post('get-user-orders-by-filters/:customer_id',getUserOrdersByFiltersController)

router.get('/get-single-order/:order_id',getSingleOrderController)

router.get('/get-placed-orders',getPlacedOrdersController)

router.get('/get-delivered-orders',getDeliveredOrdersController)

router.get('/get-cancelled-orders',getCancelledOrdersController)

router.put('/get-order/:order_id/:user_id/:slug/feedback',createFeedbackController)

router.get('/get-feedback/:slug',getAllFeedbackOfTheProductController)

router.get('/get-all-flagged-feedback-of-the-product/:slug',getFlaggedFeedBackController)

router.get('/get-all-poor-quality-feedback-of-the-product/:slug',getPoorQualityFeedbackController)

router.get('/get-all-products-with-poor-quality',getPoorQualityProductsController)

router.get('/get-all-flagged-feedback-products',getAllFlaggedFeedbackProducts)

// router.get('/get-products-by-feedback-rating',getProductsByFeedbackController)

router.put('/delete-feedback-but-user-cant-enter-feedback-again/:slug/:id',deleteFeedbackController)

module.exports=router
