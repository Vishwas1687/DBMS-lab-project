const BrandModel=require('../models/Brand')

const createBrandController=async(req,res)=>{
    try{
        const {brand_name}=req.body
        if(!brand_name)
        return res.send({message:'Brand name does not exist'})

        const brand=await BrandModel.findOne({brand_name})
        if(brand)
        return res.send({
            message:'Brand already exists',
            success:true
        })

        const newBrand=await new BrandModel({
            brand_name:brand_name
        }).save()

        res.send({
            message:`Brand ${brand_name} is created successfully`,
            success:true,
            newBrand
        })


    }catch(error)
    {
         res.send({
            message:'Something went wrong',
            success:false,
            error:error.message
         })
    }
}

const updateBrandController=async(req,res)=>{
    try{
        const {brand_name}=req.body
        const {brand_id}=req.params
        if(!brand_name)
        return res.send({message:'Brand name does not exist'})
        if(!brand_id)
        return res.send({message:'Brand id does not exist'})

        const brand=await BrandModel.findOne({brand_id})
        if(!brand)
        return res.send({
            message:'Brand name does not exist',
            success:true
        })

        const updatedBrand=await BrandModel.findByIdAndUpdate(brand._id,{
            brand_name:brand_name
        })

        res.send({
            message:`Brand ${brand_name} is updated successfully`,
            success:true,
            updatedBrand
        })


    }catch(error)
    {
         res.send({
            message:'Something went wrong',
            success:false,
            error:error.message
         })
    }
}

const deleteBrandController=async(req,res)=>{
      try{
        const {brand_id}=req.params
        if(!brand_id)
        return res.send({message:'Brand id does not exist'})

        const brand=await BrandModel.findOne({brand_id})
        if(!brand)
        return res.send({
            message:'Brand name does not exist',
            success:true
        })

        await BrandModel.findByIdAndDelete(brand._id)

        res.send({
            message:`Brand is deleted successfully`,
            success:true,
        })


    }catch(error)
    {
         res.send({
            message:'Something went wrong',
            success:false,
            error:error.message
         })
    }
}

const getAllBrandsController=async(req,res)=>{
      try{
           const brands=await BrandModel.find({})
           if(brands.length===0)
           {
            return res.send({
                message:'There are no brands',
                success:true
            })
           }

           res.send({
            message:'All brands are fetched',
            success:true,
            brands
           })
      }catch(error)
      {
          res.send({
              message:'Something went wrong',
              success:false,
              error:error.message
          })
      }
}
module.exports={createBrandController,updateBrandController,
            deleteBrandController,getAllBrandsController}