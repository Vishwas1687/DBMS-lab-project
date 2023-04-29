const mongoose=require('mongoose')
const CategoryModel=require('./Category')
const uuid = require('uuid')
// const BrandModel=require('./Brand')
// const SellerModel=require('./Seller')
const {model,Schema} =mongoose;
const WeightsSchema=new Schema({
    weight_id:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    weight_units:{
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
    stock:{
        type:Number,
        required:true
    },
})
const ProductSchema=new Schema({
    product_id:{
        type: Number,
        default: () => uuid.v4().replace(/-/g, '').slice(0, 4)
    },
    product_name:{
        type:String,
        required:true,
        unique:true
    },
    seller_id:{
        type:Number,
        default:0
    },

    // seller_id:{
    //    type:mongoose.ObjectId,
    //    ref:"Seller",
    //    required:true
    // },

    slug:{
        type:String,
        required:true,
        lowercase:true
    },
    brand:{
        type:String,
        default:"Not Branded"
    },

    // brand:{
    //     type:mongoose.ObjectId,
    //     ref:'Brand',
    //     required:true
    // },
    total_reviews:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default:2.5
    },
    total_ratings:{
        type:Number,
        default:0
    },
    weights:{
       type:[WeightsSchema],
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
    tags:{
        type:[String],
        required:true
    }
      // photo:{
    //     data:Buffer,
    //     contentType:String
    // }

},{timestamps:true})

module.exports=model('Product',ProductSchema)

