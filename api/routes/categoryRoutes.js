const express=require('express')
const formidable=require('express-formidable')
const router=express.Router()

const {createCategoryController,
    updateCategoryController,deleteCategoryController,
    getAllCategoriesController,
     getSingleCategoryController, createSubCategoryController,
    updateSubCategoryController,deleteSubCategoryController}=require('../controllers/categoryController')

router.post('/create-category',createCategoryController)

router.put('/update-category/:slug',updateCategoryController)

router.delete('/delete-category/:slug',deleteCategoryController)

router.get('/get-category/:slug',getSingleCategoryController)

router.put('/get-category/:slug/:subcategory_id/edit',updateSubCategoryController)

router.delete('/get-category/:slug/:subcategory_id/delete',deleteSubCategoryController)

router.post('/get-category/:slug/new',createSubCategoryController)

router.get('/get-all-categories',getAllCategoriesController)

// router.get('/get-photo/:slug',getPhotoController)


module.exports=router

