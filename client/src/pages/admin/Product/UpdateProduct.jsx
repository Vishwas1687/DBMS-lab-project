import React from 'react'
import Layout from '../../../components/Layout/Layout'
import AdminMenu from '../../../components/AdminMenu'
import { useState, useEffect } from "react";
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {baseUrl} from '../../../baseUrl'

const CreateProduct = () => {
  const navigate=useNavigate()
  const params=useParams()
  const [weights,setWeights]=useState([{
    weight_id:"",weight:"",weight_units:"",mrp:"",sp:"",stock:"",
  }])
  const [photo,setPhoto]=useState('')
  const [tags,setTags]=useState([])
  const [loading,setLoading]=useState(true)
  const [categories, setCategories] = useState([]);
  const [brands,setBrands]=useState([])
  const [category,setCategory]=useState('')
  const [retreivedCat,setRetreivedCat]=useState('')
  const [index,setIndex]=useState(0)
  const [subcategory,setSubcategory]=useState('')
  const [productName,setProductName]=useState('')
  const [sellerId,setSellerId]=useState('')
  const [brand,setBrand]=useState('')
  const [retreivedBrand,setRetreivedBrand]=useState('')
  
  const [cat,setCat]=useState('')
  const [catObj,setCatObj]=useState({})


  const handleTag=(e,index)=>{
    const newtags=[...tags]
    newtags[index]=e.target.value
    setTags(newtags)
  }
  const addTag=()=>{
      setTags([...tags,''])
  }
  const handleAddWeight=()=>{
   setWeights([...weights,{
      weight_id:"",weight:"",weight_units:"",mrp:"",sp:"",stock:""
    }])
  }

  const handleWeightChange=(index,field,value)=>{
    
    const newWeights=[...weights]
    newWeights[index][field]=value
    setWeights(newWeights)
 }

 const getAllCategory = async () => {
  try {
    setLoading(true)
    const { data } = await axios.get(`${baseUrl}/api/categories/get-all-categories`);
    console.log(data)
    if (data?.success) {
      setCategories(data?.categories);
    }
    setTags([...tags,' '])
    setLoading(false)
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong in getting category");
  }
};



 const getAllBrands = async () => {
  try {
    setLoading(true)
    const { data } = await axios.get(`${baseUrl}/api/brands/get-all-brands`);
    if (data?.success) {
      setBrands(data?.brands);
    }
    setLoading(false)
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong in getting category");
  }
};

const getSingleProduct=async()=>{
    try{
        const {data}=await axios.get(`${baseUrl}/api/products/get-single-product/${params.slug}`)
        console.log(data)
        if(data?.success)
        {
        setTags(data.existingProduct.tags)
        setCategory(data.existingProduct.category._id)
        setRetreivedCat(data.existingProduct.category.category_name)
        setRetreivedBrand(data.existingProduct.brand.brand_name)
        setSubcategory(data.existingProduct.subcategory)
        setSellerId(data.existingProduct.seller_id)
        setBrand(data.existingProduct.brand._id)
        setCat(data.existingProduct.category.category_name)
        setProductName(data.existingProduct.product_name)
        setWeights(data.existingProduct.weights)
        toast.success(data.message)
        }
        
    }catch(error)
    {
          toast.error('Something went wrong')
    }
}


useEffect(() => {
  getAllCategory();
  getAllBrands()
}, []);

useEffect(()=>{
    getSingleProduct()
},[params.slug])


useEffect(()=>{
   const newCategory=categories.filter((cat)=>cat._id===category)[0]
   setCatObj(newCategory)
},[category])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const newFormData=new FormData()
      newFormData.append("product_name",productName)
      newFormData.append("seller_id",sellerId)
      newFormData.append("brand",brand)
      newFormData.append("category",category)
      newFormData.append("subcategory",subcategory)
      newFormData.append("weights",JSON.stringify(weights))
      newFormData.append("tags",JSON.stringify(tags))
      newFormData.append("photo",photo)

      

      const { data } = await axios.put(
  `${baseUrl}/api/products/update-product/${params.slug}`,
  newFormData,
  {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
);
      if (data?.success) {
        toast.success(data.message);
        setWeights([{
          weight_id:"",weight:"",weight_units:"",mrp:"",sp:"",stock:""
        }])
        setLoading(false)
        navigate('/admin/manage-product')
      } else {
        toast.error(data.message);
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  };


  return (
    <Layout title={"Dashboard-Create Category"}>
      <br></br>
      <div className="container-fluid">
        <div className="row" style={{'margin-top':'2rem'}}>
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 create-category-section">
          {loading?(<h1>Loading.....</h1>):
            <>
            <h1 style={{'font-weight':'bold','padding-left':'16rem'}}>Update Product</h1>
            <br></br>
            <form onSubmit={handleSubmit} className="w-75" style={{'padding-left':'15rem'}}>
              <div className="form-group text-left">
                <div className="form-group text-left">
                <label htmlFor="product_name"
                style={{'font-weight':'bold'}}>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="product_name"
                  name="product_name"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e)=>setProductName(e.target.value)}
                  style={{'border':'2px solid #111','width':'20rem'}}
                />
              </div>
              <br></br>
              <div className="form-group text-left">
                <label htmlFor="seller_id" style={{'font-weight':'bold'}}>Seller ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="seller_id"
                  name="seller_id"
                  placeholder="Enter seller id"
                  value={sellerId}
                  onChange={(e)=>setSellerId(e.target.value)}
                  style={{'border':'2px solid #111','width':'20rem'}}
                />
              </div>
              <br></br>

              <div className="form-group text-left">
                <label className="btn btn-outline-secondary col-md-7" style={{'font-weight':'bold'}}>
                  Upload Photo
                 <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e)=>setPhoto(e.target.files[0])}
                  hidden
                  style={{'border':'2px solid #111','width':'20rem'}}
                 />
                 </label>
                 <br></br>
                 <br></br>
                 <br></br>
              <div className="mb-3">
                {!photo ? ( 
                <div className="text-left">
                  <img src={`${baseUrl}/api/products/get-photo/${params.slug}`}
                    className="img img-responsive"
                    alt="photo"
                    height={"200px"}/>
                </div>
                 ):(
                   <div className="text-left">
                  <img src={URL.createObjectURL(photo)}
                    className="img img-responsive"
                    alt="photo"
                    height={"200px"}/>
                </div>
                 )}
                 </div>   
              </div>

              <br></br>


              <div className="form-group text-left">
                <label htmlFor="brand" style={{'font-weight':'bold'}}>Brand</label>
                <br></br>
                <select className="w-50 p-2 h-25 " onChange={(e)=>setBrand(e.target.value)}
                style={{'cursor':'pointer','font-size':'1.5rem','width':'23rem','font-weight':'bold','border':'2px solid #111'}}>

                <option value={brand} name="brand">
                  {retreivedBrand}
                 </option>

                {brands && brands.map((c) => {
                 return (
                  <>
                   {c.brand_name!==retreivedBrand?(
              <option key={c._id} value={c._id} name="brand" >
              {c.brand_name}
              </option>
                  ):''
                  }
                </> )})}



              </select>
              </div>
              <br></br>
        
               <div className="form-group text-left">
              <label htmlFor="category" style={{'font-weight':'bold'}}>Category</label>
              <br></br>

              <select className="w-50 p-2 h-25 "
              style={{'cursor':'pointer','font-size':'1.5rem','width':'23rem','font-weight':'bold','border':'2px solid #111'}} onChange={(e)=>{setCategory(e.target.value);
                 setIndex(1)}}>
                 <option value={category._id} name="category">
                  {retreivedCat}
                 </option>
                 
                  
                {categories && categories.map((c) => {
                 return (
                  <>
                   {c.category_name!==retreivedCat?(
              <option key={c._id} value={c._id} name="category" >
              {c.category_name}
              </option>
                  ):''
                  }
                </> )})}
              </select>
              </div>

               
              <br></br>
              <div className="form-group text-left">
                <label htmlFor="subcategory" style={{'font-weight':'bold'}}>Subcategory</label>
                <br></br> 
                  
                 <select className="w-50 p-2 h-25" onChange={(e)=>setSubcategory(e.target.value)}
                 style={{'cursor':'pointer','font-size':'1.5rem','width':'23rem','font-weight':'bold','border':'2px solid #111'}}>
                {!index?<option value={subcategory}>{subcategory}</option>:(<>
                {catObj.subcategories.map((subcat) => (
              <option key={subcat._id} value={subcat.subcategory_name} name="subcategory"
                onClick={(e)=>setSubcategory(e.target.value)}>
              {subcat.subcategory_name}
              </option>
                ))}
               </>)} 
              </select>
              </div> 
                
              
              
              <br></br>
              {weights && weights.map((weightcta,index)=>{

                return(
                  <>

                    <div className="form-group text-left">
                    <label style={{'font-weight':'bold'}}>{`Weight id ${index+1}`}</label>
                    <input
                    type="text"
                    className="form-control"
                    name="weight_id"
                    placeholder="Enter weight id"
                    required="true"
                    value={weights[index].weight_id}
                    onChange={(e)=>{handleWeightChange(index,"weight_id",e.target.value)}}
                    style={{'border':'2px solid #111','width':'20rem'}}
                    />
                    </div>
                    <br></br>
                    <div className="form-group text-left">
                    <label style={{'font-weight':'bold'}}>{`Weight ${index+1}`}</label>
                    <input
                    type="text"
                    className="form-control"
                    name="weight"
                    placeholder="Enter weight"
                    value={weights[index].weight}
                    required="true"
                    onChange={(e)=>{handleWeightChange(index,"weight",e.target.value)}}
                    style={{'border':'2px solid #111','width':'20rem'}}
                    />
                    </div>
                    <br></br>
                    <div className="form-group text-left">
                    <label style={{'font-weight':'bold'}}>{`Weight Units ${index+1}`}</label>
                    <input
                    type="text"
                    className="form-control"
                    name="weight_units"
                    required="true"
                    placeholder="Enter weight units"
                    value={weights[index].weight_units}
                    onChange={(e)=>{handleWeightChange(index,"weight_units",e.target.value)}}
                    style={{'border':'2px solid #111','width':'20rem'}}
                    />
                    </div>
                    <br></br>

                    <div className="form-group text-left">
                    <label style={{'font-weight':'bold'}}>{`MRP ${index+1}`}</label>
                    <input
                    type="text"
                    className="form-control"
                    name="mrp"
                    required="true"
                    placeholder="Enter mrp"
                    value={weights[index].mrp}
                    onChange={(e)=>{handleWeightChange(index,"mrp",e.target.value)}}
                    style={{'border':'2px solid #111','width':'20rem'}}
                    />
                    </div>
                    <br></br>
                    <div className="form-group text-left">
                    <label style={{'font-weight':'bold'}}>{`SP ${index+1}`}</label>
                    <input
                    type="text"
                    className="form-control"
                    name="sp"
                    required="true"
                    placeholder="Enter sp"
                    value={weights[index].sp}
                    onChange={(e)=>{handleWeightChange(index,"sp",e.target.value)}}
                    style={{'border':'2px solid #111','width':'20rem'}}
                    />
                    </div>
                    <br></br>

                    <div className="form-group text-left">
                    <label style={{'font-weight':'bold'}}>{`Stock ${index+1}`}</label>
                    <input
                    type="text"
                    className="form-control"
                    name="stock"
                    required="true"
                    placeholder="Enter stock"
                    value={weights[index].stock}
                    onChange={(e)=>{handleWeightChange(index,"stock",e.target.value)}}
                    style={{'border':'2px solid #111','width':'20rem'}}
                    />
                    </div>
                    <br></br>
                  </>
                )
              })}

<button type="button"  className="btn btn-primary" onClick={handleAddWeight}
style={{'border':'2px solid #111','font-weight':'bold'}}>Create Weight</button>
               <br></br>
               <br></br>
              {tags && tags.map((tag,index)=>(
                   <div className="form-group text-left">
                    <label style={{'font-weight':'bold'}}>Tag {index+1}</label>
                    <input type="text" className="form-control" name="tag" 
                    placeholder="Enter the tag" required="true"
                    value={tags[index]} onChange={(e)=>handleTag(e,index)}
                    style={{'border':'2px solid #111','width':'20rem'}}
                    />
                    </div>
              ))}
               <br></br>
              <button type="button" className="btn btn-success" onClick={addTag}
              style={{'border':'2px solid #111','font-weight':'bold'}}>Create Another Tag</button>
              

              </div>
              <br></br>

              <button type="submit" className="btn btn-primary" style={{'font-size':'1.5rem','width':'20rem','font-weight':'bold','border':'2px solid #111'}}>
                Update
              </button>
              <br></br>
              <br></br>
              <br></br>
              </form>
           </>
          }
          </div>
          
        </div>
      </div>
      <style jsx>{`
        .form-group text-left {
          padding-top: 50px;
          text-align: center;
        }
        .form-control{
          width:500px
        }
      `}</style>
    </Layout>  
    )
}

export default CreateProduct
