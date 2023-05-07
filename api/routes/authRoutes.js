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

// protected routes

router.get('/user-auth',requiresSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})

router.get('/admin-auth',requiresSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

module.exports=router;