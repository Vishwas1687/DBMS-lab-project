const express=require('express')
const formidable=require('express-formidable')
const router=express.Router()

const {createProductController,updateProductController,
        deleteProductController,getAllProductsController,
    getSingleProductController,getProductsBySubCategoryController,
    createWeightsController,updateWeightController,deleteWeightController,
    getProductsByBrandController,getRelatedProductsController,
    getProductsBySearchController,getPhotoController,getSingleWeightController
      ,getAllProductsByFiltersController,getProductsByCategoryController,
      getPaginatedProductsController,getDocumentProductsController,
      getCategoryDocumentProductsController,getSubCategoryDocumentProductsController}
      =require('../controllers/productController')

const {requiresSignIn,isAdmin}=require('../middlewares/authmiddleware')      

router.post('/create-product',requiresSignIn,isAdmin,formidable(),createProductController)

router.put('/update-product/:slug',requiresSignIn,isAdmin,formidable(),updateProductController)

router.delete('/delete-product/:slug',requiresSignIn,isAdmin,deleteProductController)

router.get('/all-products',getAllProductsController)

router.get('/get-products-by-category/:slug',getProductsByCategoryController)

router.get('/get-products-by-subcategory/:slug/:subcategory_id',getProductsBySubCategoryController)

router.get('/get-products-by-search/:search',getProductsBySearchController)

router.get('/get-single-product/:slug',getSingleProductController)

router.post('/get-single-product/:slug/create-weights',requiresSignIn,isAdmin,createWeightsController)

router.put('/get-single-product/:slug/:weight_id/edit',requiresSignIn,isAdmin,updateWeightController)

router.delete('/get-single-product/:slug/:weight_id/delete',requiresSignIn,isAdmin,deleteWeightController)

router.get('/get-single-product/get-single-weight/:slug/:weight_id',getSingleWeightController)

router.get('/get-products-based-on-brand-and-subcategory-other-than-current-product/:brand/:subcategory/:slug',getProductsByBrandController)

router.get('/get-related-products-of-the-subcategory/:slug',getRelatedProductsController)

router.get('/get-photo/:slug',getPhotoController)

router.get('/get-all-products-based-on-filters',getAllProductsByFiltersController)

router.get('/get-paginated-products-for-homepage',getPaginatedProductsController)

router.get('/get-total-products-in-homepage',getDocumentProductsController)

router.get('/get-total-products-in-category-page/:slug',getCategoryDocumentProductsController)

router.get('/get-total-products-in-subcategory-page/:slug/:subcategory_id',getSubCategoryDocumentProductsController)

module.exports=router
