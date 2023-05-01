const express=require('express')

const {registerController,loginController,
    forgotPasswordController}=require('../controllers/authController')

const {requiresSignIn,isAdmin}=require('../middlewares/authmiddleware')
const router=express.Router()

router.post('/login',loginController)

router.post('/register',registerController)

router.put('/forgot-password',forgotPasswordController)

router.get('/test',requiresSignIn,isAdmin,(req,res)=>{
    res.send({message:'Protected Routes'})
})



module.exports=router;