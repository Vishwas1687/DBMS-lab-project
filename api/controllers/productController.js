const { response } = require('express')
const slugify=require('slugify')
// const OrderModel=require('../models/Order')
const CategoryModel=require('../models/Category')
const fs=require('fs')
const ProductModel=require('../models/Product')

const createProductController=async(req,res)=>{
    try{
    const {product_name,seller_id,brand,
        category,subcategory}=req.fields
    const weights=JSON.parse(req.fields.weights)
    const tags=JSON.parse(req.fields.tags) 
    const {photo} =req.files    
    if(!product_name)
    return res.send({message:'Enter product name'})
    if(!seller_id)
    return res.send({message:'Enter seller id'})
    if(!brand)
    return res.send({message:'Enter brand name'})
    if(weights.length===0)
    return res.send({message:'Enter weights'})
    if(!category)
    return res.send({message:'Enter category'})
    if(!subcategory)
    return res.send({message:'Enter subcategory'})
    if(tags.length===0)
    return res.send({message:'Enter the tags'})
    if(photo && photo.size > 1000000)
    return res.send({message:'Photo should be entered'})

    const existingProduct=await ProductModel.findOne({product_name}).select("-photo").populate('brand')
    if(existingProduct)
    {
        return res.send({
            message:`Product ${existingProduct.product_name} already exists`,
            success:false
        })
    }

    const existingCategory=await CategoryModel.findById(category)
    if(!existingCategory)
    {
        return res.send({
            message:'Category does not exist',
            success:false
        })
    }

    const newProduct=await new ProductModel({
        product_name:product_name,
        slug:slugify(product_name),
        seller_id:seller_id,
        brand:brand,
        category:category,
        subcategory:subcategory,
        weights:weights,
        tags:tags
    })

    const product=newProduct
    if(photo && photo.path){
     newProduct.photo.data=fs.readFileSync(photo.path)
    newProduct.photo.contentType=photo.type
    }
    else{
        return res.send({
            message:'Error in phot path',
            success:false
        })
    }
    

    await newProduct.save()
    res.send({
        message:`Product ${newProduct.product_name} is created successfully`,
        success:true,
        product
    })

    }catch(error)
    {
        console.log(error)
        res.send({
            message:'Something did go wrong',
            success:false,
            error:error.message
        })
    }
}

const updateProductController=async(req,res)=>{
    try{
    const {product_name,seller_id,brand,
        category,subcategory}=req.fields
    const weights=JSON.parse(req.fields.weights) 
    const tags=JSON.parse(req.fields.tags)   
    const {photo}=req.files    
    const {slug}=req.params
    if(!product_name)
    return res.send({message:'Enter product name'})
    if(!seller_id)
    return res.send({message:'Enter seller id'})
    if(!brand)
    return res.send({message:'Enter brand name'})
    if(!weights)
    return res.send({message:'Enter weights'})
    if(!category)
    return res.send({message:'Enter category'})
    if(!subcategory)
    return res.send({message:'Enter subcategory'})
    if(!tags)
    return res.send({message:'Enter the tags'})
    if(!slug)
    return res.send({message:'Enter the slug'})
    if(!photo)
    return res.send({message:'Enter the photo'})

    const existingProduct=await ProductModel.findOne({slug}).populate('brand')
    if(!existingProduct)
    {
        return res.send({
            message:`Product ${slug} does not exist to update`,
            success:false
        })
    }

    const existingCategory=await CategoryModel.findById(category)
    if(!existingCategory)
    {
        return res.send({
            message:'Category does not exist',
            success:false
        })
    }

    const updatedProduct=await ProductModel.findByIdAndUpdate(existingProduct._id,{
        product_id:existingProduct.product_id,
        product_name:product_name,
        slug:slugify(product_name),
        seller_id:seller_id,
        brand:brand.brand_name,
        weights:weights,
        category:category,
        subcategory:subcategory,
        photo:{
            data:fs.readFileSync(photo.path),
            contentType:photo.type
        },
        tags:tags,
    },{new:true})

     


    await updatedProduct.save()

    res.send({
        message:`Product ${updatedProduct.product_name} is updated successfully`,
        success:true,
        updatedProduct
    })

    }catch(error)
    {
        console.log(error)
        res.send({
            message:'Something did go wrong',
            success:false,
            error:error.message
        })
    }
}

const deleteProductController=async(req,res)=>{
    try{
       const {slug}=req.params
       if(!slug)
       return res.send({message:'Enter slug'})
       const existingProduct=await ProductModel.findOne({slug})
       if(!existingProduct)
       {
        return res.send({
            message:`Product ${slug} does not exist`,
            success:false
        })
       }

    //    const orders = await OrderModel.updateMany(
    //   { 'items.product': existingProduct._id },
    //   { $set: { 'items.$.feedback': null } },
    // );

       await ProductModel.findByIdAndDelete(existingProduct._id)
       res.send({
           message:`Product ${slug} deleted successfully`,
           success:true
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

const getAllProductsController=async(req,res)=>{
     try{
        const products=await ProductModel.find({}).select("-photo").populate('category').populate('brand')

        res.send({
            message:'All products are fetched',
            success:true,
            products
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

const getSingleProductController=async(req,res)=>{
    try{
        const {slug}=req.params
        const existingProduct=await ProductModel.findOne({slug}).select('-photo').populate('category').populate('brand')
        if(!existingProduct)
        {
            return res.send({
                message:`Product ${slug} does not exist`,
                success:false
            })
        }
        res.send({
            message:`Product ${slug} successfully fetched`,
            success:true,
            existingProduct
        })
    }catch{
         res.send({
            message:'Something went wrong',
            success:false,
            error:error.message
         })
    }
}

const getPhotoController=async(req,res)=>{
    try{
        const {slug}=req.params
        const product=await ProductModel.findOne({slug}).select("photo")
        if(!product.photo.data)
        {
            return res.send({
                message:'Photo does not exist',
                success:false
            })
        }
        res.set("Content-type",product.photo.contentType)
        res.send(product.photo.data)
    }catch(error)
    {
       res.send({
        message:'Something went wrong',
        success:false,
        error:error.message
       })
    }
}

const getProductsBySubCategoryController=async(req,res)=>{
    try{
         const {slug,subcategory_id}=req.params
         if(!slug)
         return res.send({message:'Enter slug'})
         if(!subcategory_id)
         return res.send({message:'Enter sub category id'})
         const category=await CategoryModel.findOne({slug})
         if(!category)
         {
            return res.send({
                message:`Category of the subcategory does not exist`,
                success:false
            })
         }
         const subcategory=category.subcategories.filter((subcat)=>subcat.subcategory_id===parseInt(subcategory_id))[0]
          if(!subcategory)
          {
            return res.send({
                message:`Sub category does not exist`,
                success:false
            })
          }

          const products=await ProductModel.find({subcategory:subcategory.subcategory_name})
          .select('-photo').populate('category').populate('brand')

          if(!products)
          {
            return res.send({
                message:`There are no products of the subcategory ${subcategory.subcategory_name}`,
                success:true
            })
          }

          res.send({
            message:`Products of the subcategory ${subcategory.subcategory_name} is successfully fetched`,
            success:true,
            products
          })
    }catch(error){
         res.send({
            message:'Something went wrong',
            success:false,
            error:error.message
         })
    }
}

const createWeightsController=async(req,res)=>{
    try{
       const {weight_id,weight,weight_units,mrp,sp,stock}=req.body
       const {slug}=req.params
       if(!weight_id)
       return res.send({message:'Enter the weight id'})
       if(!weight)
       return res.send({message:'Enter the weight'})
       if(!weight_units)
       return res.send({message:'Enter the weight units'})
       if(!mrp)
       return res.send({message:'Enter the mrp'})
       if(!sp)
       return res.send({message:'Enter the sp'})
       if(!stock)
       return res.send({message:'Enter the stock'})
       if(!slug)
       return res.send({message:'Enter the slug'})

       const existingProduct=await ProductModel.findOne({slug})
       if(!existingProduct)
       {
        return res.send({
            message:'Product does not exist',
            success:false,
        })
       }

       const Weight=existingProduct.weights.filter((w)=>w.weight_id===weight_id)[0]
       if(Weight)
       {
          return res.send({
            message:'Weight id already exists',
            success:false
          })
       }
       
       const newWeight={
           weight_id:weight_id,
           weight:weight,
           weight_units:weight_units,
           mrp:mrp,
           sp:sp,
           stock:stock
       }

       existingProduct.weights.push(newWeight)

       await existingProduct.save()

       res.send({
        message:`Weight for the product is successfully added`,
        success:true,
        existingProduct
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

const updateWeightController=async(req,res)=>{
    try{
       const {weight,weight_units,mrp,sp,stock}=req.body
       const {slug,weight_id}=req.params
       if(!weight)
       return res.send({message:'Enter the weight'})
       if(!weight_units)
       return res.send({message:'Enter the weight units'})
       if(!mrp)
       return res.send({message:'Enter the mrp'})
       if(!sp)
       return res.send({message:'Enter the sp'})
       if(!stock)
       return res.send({message:'Enter the stock'})
       if(!slug)
       return res.send({message:'Enter the slug'})

       const existingProduct=await ProductModel.findOne({slug})
       if(!existingProduct)
       {
        return res.send({
            message:'Product does not exist',
            success:false,
        })
       }

       const existingWeight=existingProduct.weights.filter((w)=>w.weight_id===parseInt(weight_id))[0]
       if(!existingWeight)
       {
        return res.send({
            message:`Weight with ${existingWeight.weight_id} does not exist`,
            success:false
        })
       }

       const updatedProduct=await ProductModel.findOneAndUpdate({
        slug,"weights.weight_id":weight_id},{
            $set:{"weights.$.weight":weight,"weights.$.weight_units":weight_units,
             "weights.$.mrp":mrp,"weights.$.sp":sp,"weights.$.stock":stock}
        },{new:true}
       )

       res.send({
        message:`Weight successfully updated`,
        success:true,
        updatedProduct
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

const deleteWeightController=async(req,res)=>{
    try{
        const {slug,weight_id}=req.params
        if(!slug)
        return res.send({message:'Enter slug'})
        if(!weight_id)
        return res.send({message:'Enter weight id'})
        const existingProduct=await ProductModel.findOne({slug})
        if(!existingProduct)
        {
            return res.send({
                message:`Product ${slug} does not exist`,
                success:false
            })
        }

        const existingWeight=existingProduct.weights.filter((w)=>w.weight_id===parseInt(weight_id))[0]
        if(!existingWeight)
        {
            return res.send({
                message:`Weight of the product does not exist`,
                success:false
            })
        }

        await ProductModel.findOneAndUpdate({
            slug,"weights.weight_id":weight_id},{
                $pull:{weights:{weight_id}}
            },{new:true})

        res.send({
            message:`Weight with ${weight_id} id of product ${slug} successfully deleted`,
            success:true
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

const getProductsByBrandController=async(req,res)=>{
    try{
         const {brand,subcategory,slug}=req.params
         if(!brand)
         return res.send({message:'Brand does not exist'})
         if(!subcategory)
         return res.send({message:'Enter subcategory name'})
         if(!slug)
         return res.send({message:'Slug is not entered'})

         let products=await ProductModel.find({brand,subcategory}).select('-photo').populate('category').populate('brand')

         products=products.filter((pro)=>pro.slug!==slug)

         res.send({
            message:`Products successfully fetched`,
            success:true,
            products
         })
    }catch(error)
    {
         return res.send({
            message:'Something went wrong',
            success:false,
            error:error.message
         })
    }
}

const getSingleWeightController=async(req,res)=>{
    try{
        const {slug,weight_id}=req.params
        if(!slug)
        return res.send({message:"Enter slug"})
        if(!weight_id)
        return res.send({message:'Enter the weight id'})

        const product=await ProductModel.findOne({slug})
        if(!product)
        {
            return res.send({
                message:'Product does not exist',
                success:false,
            })
        }

        const weight=product.weights.filter((weight)=>weight.weight_id===parseInt(weight_id))[0]
        if(!weight)
        {
            return res.send({
                message:'Weight does not exist',
                success:false
            })
        }

        res.send({
            message:"Weight information is fetched",
            success:true,
            weights:weight
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

const getRelatedProductsController=async(req,res)=>{
    try{
        const {slug}=req.params
        if(!slug)
        res.send({message:'Enter the slug'})

        const existingProduct=await ProductModel.findOne({slug}).populate('brand')

        if(!existingProduct)
        return res.send(
            {message:'Product does not exist',
            success:false
             }
          )

        const subcategory=existingProduct.subcategory
        let products=await ProductModel.find({subcategory}).select('-photo').populate('brand').populate('category')
        products=products.filter((pro)=>pro.slug!==slug)

        res.send({
            message:'Related products of the products fetched',
            success:true,
            products
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

const getProductsBySearchController=async(req,res)=>{
    try{
         const {search}=req.params
         if(!search)
         res.send({message:'Search is not entered'})

         const products=await ProductModel.find({
            $or:[
                {
                    tags:{$in:[search]},
                },
                {
                    product_name:{$regex:search,$options:'i'}
                }
            ]}).select('-photo').populate('category').populate('brand')

          if(products.length==0)
          {
            return res.send({
                message:'No products found',
                success:true
            })
          }

          res.send({
            message:'Product successfully fetched',
            success:true,
            products
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
const getAllProductsByFiltersController=async(req,res)=>{
    try{
        const priceFilters=JSON.parse(req.query.priceFilters)
        let products=[]
        if(priceFilters.length!==0)
        {
            const minimumPrice=priceFilters[0]
            const maximumPrice=priceFilters[1]
            const priceProducts=await ProductModel.find({
                weights:{
                    $elemMatch:
                        {sp:{
                            $gte:minimumPrice,
                            $lte:maximumPrice
                    }
                }
            }
                        
        }
            ).select('-photo').populate('category').populate('brand')
            products=priceProducts
        }



        if(priceFilters.length!==0)
        {
            const minimumPrice=priceFilters[0]
            const maximumPrice=priceFilters[1]
            
            const sortedWeightProducts=products.map((product)=>{
                const matchWeight=product.weights.filter((weight)=>(
                     (weight.sp<=maximumPrice && weight.sp>=minimumPrice) 
                     
                ))
                const unmatchWeight=product.weights.filter((weight)=>(
                     (weight.sp>maximumPrice || weight.sp<minimumPrice) 
                     
                ))

                return {
                    ...product._doc,
                    weights:[...matchWeight,...unmatchWeight]
                }
            })
            products=sortedWeightProducts
        }
        
        res.send({
            message:'Products fetched',
            success:true,
            products
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

const getProductsByCategoryController=async(req,res)=>{
    try{
        const {slug}=req.params
        if(!slug)
        return res.send({message:'Enter slug'})
        const category=await CategoryModel.findOne({slug})
        if(!category)
        {
            return res.send({
                message:'Category does not exist',
                success:false
            })
            
        }
        const products=await ProductModel.find({category:category._id}).select('-photo').populate('brand').populate('category')
        res.send({
            message:'Products are fetched',
            success:true,
            products
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

const getPaginatedProductsController=async(req,res)=>{
    try{
       const {page,perPage}=req.query;
       const products=await ProductModel.find({}).select("-photo")
       .skip(perPage*(page-1)).limit(perPage)
       if(products.length===0)
       return res.send({
        message:'No products left',
        success:true,
       })
       res.send({
        message:'Products fetched',
        success:true,
        products
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

const getDocumentProductsController=async(req,res)=>{
    try{
        const count=await ProductModel.find({}).countDocuments()
        res.send({
            message:'Total count of products fetched',
            success:true,
            count
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

const getCategoryDocumentProductsController=async(req,res)=>{
    try{
       const {slug}=req.params
       const category=await CategoryModel.findOne({slug})
       if(!category)
       return res.send(
        {message:'Category does not exist',
       success:false}
       )
       const count=await ProductModel.find({category:category._id}).countDocuments()
       res.send({
        message:'Count of documents fetched',
        success:true,
        count
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

const getSubCategoryDocumentProductsController=async(req,res)=>{
    try{
       const {slug,subcategory_id}=req.params
       const category=await CategoryModel.findOne({slug})
       if(!category)
       return res.send(
        {message:'Category does not exist',
       success:false}
       )

       const subcategory=category.subcategories.filter((subcat)=>{
        return subcat.subcategory_id===parseInt(subcategory_id)
       })[0]

       if(!subcategory)
        return res.send(
        {message:'Subcategory does not exist',
       success:false}
       )

       const count=await ProductModel.find({subcategory:subcategory.subcategory_name}).countDocuments()
       res.send({
        message:'Count of documents fetched',
        success:true,
        count
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

const getProductsByCategoryPaginatedController=async(req,res)=>{
     try{
        const {slug}=req.params
        const {perPage,currentPage}=req.query
        if(!slug)
        return res.send({message:'Enter slug'})
        const category=await CategoryModel.findOne({slug})
        if(!category)
        {
            return res.send({
                message:'Category does not exist',
                success:false
            })
            
        }
        const products=await ProductModel.find({category:category._id}).
        select('-photo').populate('brand').populate('category').
        skip((currentPage-1)*perPage).limit(perPage)
        res.send({
            message:'Products are fetched',
            success:true,
            products
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
const getProductsBySubCategoryPaginatedController=async(req,res)=>{
     try{
         const {slug,subcategory_id}=req.params
         const {perPage,currentPage}=req.query
         if(!slug)
         return res.send({message:'Enter slug'})
         if(!subcategory_id)
         return res.send({message:'Enter sub category id'})
         const category=await CategoryModel.findOne({slug})
         if(!category)
         {
            return res.send({
                message:`Category of the subcategory does not exist`,
                success:false
            })
         }
         const subcategory=category.subcategories.filter((subcat)=>subcat.subcategory_id===parseInt(subcategory_id))[0]
          if(!subcategory)
          {
            return res.send({
                message:`Sub category does not exist`,
                success:false
            })
          }

          const products=await ProductModel.find({subcategory:subcategory.subcategory_name})
          .select('-photo').populate('category').populate('brand')
          .skip((currentPage-1)*perPage).limit(perPage)

          if(!products)
          {
            return res.send({
                message:`There are no products of the subcategory ${subcategory.subcategory_name}`,
                success:true
            })
          }

          res.send({
            message:`Products of the subcategory ${subcategory.subcategory_name} is successfully fetched`,
            success:true,
            products
          })
    }catch(error){
         res.send({
            message:'Something went wrong',
            success:false,
            error:error.message
         })
    }
}
module.exports={createProductController,updateProductController,
            deleteProductController,getAllProductsController,getSingleProductController,
        getProductsBySubCategoryController,createWeightsController,
        updateWeightController,deleteWeightController,getProductsByBrandController,
        getRelatedProductsController,getProductsBySearchController,getPhotoController,
        getSingleWeightController,getAllProductsByFiltersController,
        getProductsByCategoryController,getPaginatedProductsController,
         getDocumentProductsController,getCategoryDocumentProductsController,
         getSubCategoryDocumentProductsController,getProductsBySubCategoryPaginatedController,
        getProductsByCategoryPaginatedController}