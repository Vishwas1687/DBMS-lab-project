const mongoose=require('mongoose')
const {model,Schema} =mongoose;
const SubCategorySchema=new Schema({
    subcategory_id:{
        type:Number,
        required:true,
    },
    subcategory_name:{
        type:String,
        required:true
    },
    // photo:{
    //     data:Buffer,
    //     contentType:String
    // }
})
const CategorySchema=new Schema({
    category_id:{
        type:Number,
        required:true,
        unique:true
    },
    category_name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    subcategories:{
        type:[SubCategorySchema],
        required:true
    },
      // photo:{
    //     data:Buffer,
    //     contentType:String
    // }

})

module.exports=model('Category',CategorySchema)