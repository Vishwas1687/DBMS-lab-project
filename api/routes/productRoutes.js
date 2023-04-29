const express=require('express')
const formidable=require('express-formidable')
const router=express.Router()

const {createProductController,updateProductController,
        deleteProductController,getAllProductsController,
    getSingleProductController,getProductsBySubCategoryController,
    createWeightsController,updateWeightController,deleteWeightController}=require('../controllers/productController')

router.post('/create-product',createProductController)

router.put('/update-product/:slug',updateProductController)

router.delete('/delete-product/:slug',deleteProductController)

router.get('/all-products',getAllProductsController)

router.get('/get-products-by-subcategory/:slug/:subcategory_id',getProductsBySubCategoryController)

//router.get('/get-products-by-search',getProductsBySearchController)

router.get('/get-single-product/:slug',getSingleProductController)

router.post('/get-single-product/:slug/create-weights',createWeightsController)

router.put('/get-single-product/:slug/:weight_id/edit',updateWeightController)

router.delete('/get-single-product/:slug/:weight_id/delete',deleteWeightController)

// router.get('/get-products-based-on-brand-and-subcategory/:brand/:subcategory',getProductsByBrandController)

// router.get('/get-related-products-of-the-subcategory/:product_id',getRelatedProductsController)

//router.get('/get-products-by-filters/:args',getProductsByFilterController)

// router.get('/get-photo/:slug',getPhotoController)

module.exports=router
