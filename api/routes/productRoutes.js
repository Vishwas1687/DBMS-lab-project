const express=require('express')
const formidable=require('express-formidable')
const router=express.Router()

const {createProductController,updateProductController,
        deleteProductController,getAllProductsController,
    getSingleProductController,getProductsBySubCategoryController,
    createWeightsController,updateWeightController,deleteWeightController,
    getProductsByBrandController,getRelatedProductsController,
    getProductsBySearchController,getPhotoController,getSingleWeightController
      ,getAllProductsByFiltersController,getProductsByCategoryController}=require('../controllers/productController')

router.post('/create-product',formidable(),createProductController)

router.put('/update-product/:slug',formidable(),updateProductController)

router.delete('/delete-product/:slug',deleteProductController)

router.get('/all-products',getAllProductsController)

router.get('/get-products-by-category/:slug',getProductsByCategoryController)

router.get('/get-products-by-subcategory/:slug/:subcategory_id',getProductsBySubCategoryController)

router.get('/get-products-by-search/:search',getProductsBySearchController)

router.get('/get-single-product/:slug',getSingleProductController)

router.post('/get-single-product/:slug/create-weights',createWeightsController)

router.put('/get-single-product/:slug/:weight_id/edit',updateWeightController)

router.delete('/get-single-product/:slug/:weight_id/delete',deleteWeightController)

router.get('/get-single-product/get-single-weight/:slug/:weight_id',getSingleWeightController)

router.get('/get-products-based-on-brand-and-subcategory-other-than-current-product/:brand/:subcategory/:slug',getProductsByBrandController)

router.get('/get-related-products-of-the-subcategory/:slug',getRelatedProductsController)


router.get('/get-photo/:slug',getPhotoController)

router.get('/get-all-products-based-on-filters',getAllProductsByFiltersController)

module.exports=router
