import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/AdminMenu'
import { useState, useEffect } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CreateProduct = () => {
  const navigate=useNavigate()
  const [weights,setWeights]=useState([{
    weight_id:"",weight:"",weight_units:"",mrp:"",sp:"",stock:"",
  }])
  const [photo,setPhoto]=useState("")
  const [tags,setTags]=useState([])
  const [loading,setLoading]=useState(true)
  const [categories, setCategories] = useState([]);
  const [brands,setBrands]=useState([])
  const [category,setCategory]=useState({})
  const [index,setIndex]=useState(0)
  const [formData, setFormData] = useState({
    product_name: "",
    seller_id: "",
    brand: "",
    category: "",
    subcategory:"",
  });

  const handleTag=(e,index)=>{
    const newtags=[...tags]
    newtags[index]=e.target.value
    setTags(newtags)
  }
  const addTag=()=>{
      setTags([...tags,' '])
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
    const { data } = await axios.get(`http://localhost:5000/api/categories/get-all-categories`);
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
    const { data } = await axios.get(`http://localhost:5000/api/brands/get-all-brands`);
    if (data?.success) {
      setBrands(data?.brands);
    }
    setLoading(false)
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong in getting category");
  }
};

useEffect(() => {
  getAllCategory();
  getAllBrands()
}, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategory=(e)=>{
    const newFormData={...formData}
    newFormData["category"]=e.target.value
    setFormData(newFormData)
    const newCategory=categories.find((cat)=>cat._id===e.target.value)
    setCategory(newCategory)
    setIndex(1)
  }

  const handleSubCategory=(e)=>{
    const newFormData={...formData}
    newFormData["subcategory"]=e.target.value
    setFormData(newFormData)
  }

  const handleBrand=(e)=>{
    const newFormData={...formData}
    newFormData["brand"]=e.target.value
    setFormData(newFormData)
  }

  useEffect(()=>{
     console.log(category)
  },[category])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const newFormData=new FormData()
      newFormData.append("product_name",formData.product_name)
      newFormData.append("seller_id",formData.seller_id)
      newFormData.append("brand",formData.brand)
      newFormData.append("category",formData.category)
      newFormData.append("subcategory",formData.subcategory)
      newFormData.append("weights",JSON.stringify(weights))
      newFormData.append("tags",JSON.stringify(tags))
      newFormData.append("photo",photo)
      const { data } = await axios.post(
        "http://localhost:5000/api/products/create-product",
        newFormData
      );
      if (data?.success) {
        toast.success(data.message);
        setFormData({
          product_name: "",
          seller_id:"",
          brand:"",
          category:"",
          subcategory:"",
        });
        setWeights([{
          weight_id:"",weight:"",weight_units:"",mrp:"",sp:"",stock:""
        }])
        setLoading(false)
        navigate('/admin/manage-product')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error)
    }
  };


  return (
    <Layout title={"Dashboard-Create Category"}>
      <br></br>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 create-category-section">
          {loading?(<h1>Loading.....</h1>):
            <>
            <h1>Create Product</h1>
            <br></br>
            <form onSubmit={handleSubmit} className="w-75">
              <div className="form-group text-left">
                <div className="form-group text-left">
                <label htmlFor="product_name">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="product_name"
                  name="product_name"
                  placeholder="Enter product name"
                  value={formData.product_name}
                  onChange={handleChange}
                  
                />
              </div>
              <br></br>
              <div className="form-group text-left">
                <label htmlFor="seller_id">Seller ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="seller_id"
                  name="seller_id"
                  placeholder="Enter seller id"
                  value={formData.seller_id}
                  onChange={handleChange}
                  
                />
              </div>
              <br></br>

              <div className="form-group text-left">
                <label className="btn btn-outline-secondary col-md-7">
                  {photo?photo.name:"Upload Photo"}
                 <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e)=>setPhoto(e.target.files[0])}
                  hidden
                 />
                 </label>
                 <br></br>
                 <br></br>
                 <br></br>
              <div className="mb-3">
                {photo && ( 
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
                <label htmlFor="brand">Brand</label>
                <br></br>
                <select className="w-50 h-25 p-2 " onChange={(e)=>{handleBrand(e)}}>
                {Object.keys(formData.brand).length===0 && <option value="1">None</option>}
                {brands.map((brand) => (
              <option key={brand._id} value={brand._id} name="brand">
              {brand.brand_name}
              </option>
               ))}
              </select>
              </div>
              <br></br>
        
              <div className="form-group text-left">
              <label htmlFor="category">Category</label>
              <br></br>
              <select className="w-50 h-25 p-2 " onChange={(e)=>{handleCategory(e)}}>
                {Object.keys(category).length===0 && <option value="1">None</option>}
                {categories.map((cat) => (
              <option key={cat._id} value={cat._id} name="category">
              {cat.category_name}
              </option>
               ))}
              </select>
              </div>

              <br></br>
            {index?
               (<div className="form-group text-left">
                <label htmlFor="subcategory">Subcategory</label>
                <br></br>
                  
                 <select className="w-50 h-25 p-2 " onChange={(e)=>{handleSubCategory(e)}}>
                  {Object.keys(formData.subcategory).length===0 && <option value="1">None</option>}
                {category?.subcategories.map((subcat) => (
              <option key={subcat._id} value={subcat.subcategory_name} name="subcategory">
              {subcat.subcategory_name}
              </option>
               ))}
              </select>
              </div>) :"" }
              
              
              <br></br>
              {weights.map((weightcta,index)=>{

                return(
                  <>

<div className="form-group text-left">
                    <label>{`Weight id ${index+1}`}</label>
                    <input
                    type="text"
                    className="form-control"
                    name="weight_id"
                    placeholder="Enter weight id"
                    required="true"
                    value={weights[index].weight_id}
                    onChange={(e)=>{handleWeightChange(index,"weight_id",e.target.value)}}
                    />
                    </div>
                    <br></br>
                    <div className="form-group text-left">
                    <label>{`Weight ${index+1}`}</label>
                    <input
                    type="text"
                    className="form-control"
                    name="weight"
                    placeholder="Enter weight"
                    value={weights[index].weight}
                    required="true"
                    onChange={(e)=>{handleWeightChange(index,"weight",e.target.value)}}
                    />
                    </div>
                    <br></br>
                    <div className="form-group text-left">
                    <label>{`Weight Units ${index+1}`}</label>
                    <input
                    type="text"
                    className="form-control"
                    name="weight_units"
                    required="true"
                    placeholder="Enter weight units"
                    value={weights[index].weight_units}
                    onChange={(e)=>{handleWeightChange(index,"weight_units",e.target.value)}}
                    />
                    </div>
                    <br></br>

                    <div className="form-group text-left">
                    <label>{`MRP ${index+1}`}</label>
                    <input
                    type="text"
                    className="form-control"
                    name="mrp"
                    required="true"
                    placeholder="Enter mrp"
                    value={weights[index].mrp}
                    onChange={(e)=>{handleWeightChange(index,"mrp",e.target.value)}}
                    />
                    </div>
                    <br></br>
                    <div className="form-group text-left">
                    <label>{`SP ${index+1}`}</label>
                    <input
                    type="text"
                    className="form-control"
                    name="sp"
                    required="true"
                    placeholder="Enter sp"
                    value={weights[index].sp}
                    onChange={(e)=>{handleWeightChange(index,"sp",e.target.value)}}
                    />
                    </div>
                    <br></br>

                    <div className="form-group text-left">
                    <label>{`Stock ${index+1}`}</label>
                    <input
                    type="text"
                    className="form-control"
                    name="stock"
                    required="true"
                    placeholder="Enter stock"
                    value={weights[index].stock}
                    onChange={(e)=>{handleWeightChange(index,"stock",e.target.value)}}
                    />
                    </div>
                    <br></br>
                  </>
                )
              })}

<button type="button"  className="btn btn-primary" onClick={handleAddWeight}>Create Weight</button>
               <br></br>
               <br></br>
              {tags.map((tag,index)=>(
                   <div className="form-group text-left">
                    <label>Tag {index+1}</label>
                    <input type="text" className="form-control" name="tag" 
                    placeholder="Enter the tag" required="true"
                    value={tags[index]} onChange={(e)=>handleTag(e,index)}
                    />
                    </div>
              ))}
               <br></br>
              <button type="button" className="btn btn-success" onClick={addTag}>Create Another Tag</button>
              

              </div>
              <br></br>

              <button type="submit" className="btn btn-primary col-md-7">
                Create
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
