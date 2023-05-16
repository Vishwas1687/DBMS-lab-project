const express=require('express')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const passport= require('passport')
const UserModel=require('../models/User')
const {registerController,loginController,
    forgotPasswordController,getAllUsersController,
    updateProfileController}=require('../controllers/authController')

const {requiresSignIn,isAdmin}=require('../middlewares/authmiddleware')
const router=express.Router()

dotenv.config()
// auth with google
router.get('/google',passport.authenticate('google',{scope:['profile','email']}))

// google auth callback
router.get('/google/callback',passport.authenticate('google',{failureRedirect:'http://localhost:3000'}),
  async(req,res)=>{
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_TOKEN, { expiresIn: '365d' });
    const existingUser=await UserModel.findById(req.user._id)
    const user={
       username:req.user.username,
       email:req.user.email,
       address: encodeURIComponent(existingUser.address),
        phone_number: encodeURIComponent(existingUser.phone_number)
    }

     res.redirect(`http://localhost:3000/sample?user=${JSON.stringify(user)}&token=${token}`);
    //  res.status(200).send({
    //   success: true,
    //   token: token,
    // });
  })

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

router.put('/update-profile',requiresSignIn,updateProfileController)

router.get('/get-all-users',requiresSignIn,isAdmin,getAllUsersController)

module.exports=router;