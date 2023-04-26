const mongoose=require('mongoose')
const CategoryModel=require('./Category')
const {model,Schema} =mongoose;
const ProductSchema=new Schema({
    product_id:{
        type:Number,
        required:true,
        unique:true
    },
    product_name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    mrp:{
       type:Number,
       required:true
    },
    sp:{
       type:Number,
       required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:'Category',
        required:true,
    },
    subcategory:{
        type:String,
        required:true,
        validate:{
            validator:async function(v)
            {
                const category=await CategoryModel.findById(this.category)
                return category.subcategories.some((sub) => sub.subcategory_name === v);
            },
            message:props=>`${props.value} is not a valid subcategory of this category`
        }
    },
    quantity:{
        type:Number,
        required:true
    },
      // photo:{
    //     data:Buffer,
    //     contentType:String
    // }

})

module.exports=model('Product',ProductSchema)