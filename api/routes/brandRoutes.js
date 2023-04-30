const express=require('express')
const router=express.Router()

const {createBrandController,updateBrandController,
       deleteBrandController,getAllBrandsController}=require('../controllers/brandController')

router.post('/create-brand',createBrandController)

router.put('/update-brand/:brand_id',updateBrandController)

router.delete('/delete-brand/:brand_id',deleteBrandController)

router.get('/get-all-brands',getAllBrandsController)
module.exports=router
