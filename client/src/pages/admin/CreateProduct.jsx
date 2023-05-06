import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/AdminMenu'
import { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateProduct = ({ productName, sellerId, brandName, totalReviews, productRating, totalRating, categoryName, subcategoryName}) => {

  const [weights,setWeights]=useState([{
    weight_id:"",weight:"",weight_units:"",mrp:"",sp:"",stock:"",
  }])
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    product_name: productName || "",
    seller_id: sellerId || "",
    brand: brandName || "",
    total_reviews: totalReviews || "",
    rating: productRating || "",
    total_ratings: totalRating || "",
    category: categoryName || "",
    subcategory: subcategoryName || "",
  });

  const handleAddWeight=()=>{
    return setWeights([...weights,{
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
    const { data } = await axios.get(
      "http://localhost:5000/api/categories/get-all-categories"
    );
    if (data?.success) {
      setCategories(data?.categories);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong in getting category");
  }
};

useEffect(() => {
  getAllCategory();
}, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithWeights={
        product_name:formData.product_name,
        seller_id:formData.seller_id,
        brand:formData.brand,
        total_reviews:formData.total_reviews,
        rating:formData.rating,
        total_ratings:formData.total_ratings,
        category:formData.category,
        subcategory:formData.subcategory,
        weights:setWeights
      }
      const { data } = await axios.post(
        "http://localhost:5000/api/products/create-product",
        formDataWithWeights
      );
      if (data?.success) {
        alert(`${formData.product_name} is added`);
        setFormData({
          product_name: "",
          seller_id:"",
          brand:"",
          total_reviews:"",
          rating:"",
          total_ratings:"",
          category:"",
          subcategory:"",
        });
        setWeights([{
          weight_id:"",weight:"",weight_units:"",mrp:"",sp:"",stock:""
        }])
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout title={"Dashboard-Create Category"}>
      <br></br>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-10 create-category-section">
            <h1>Create Product</h1>
            <br></br>
            <form >
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
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  className="form-control"
                  id="brand"
                  name="brand"
                  placeholder="Enter brand"
                  value={formData.brand}
                  onChange={handleChange}
                  
                />
              </div>
              <br></br>
              <div className="form-group text-left">
                <label htmlFor="total_reviews">Total Reviews</label>
                <input
                  type="text"
                  className="form-control"
                  id="total_reviews"
                  name="total_reviews"
                  placeholder="Enter total reviews"
                  value={formData.total_reviews}
                  onChange={handleChange}
                  
                />
              </div>
              <br></br>
              <div className="form-group text-left">
                <label htmlFor="ratings">Rating</label>
                <input
                  type="text"
                  className="form-control"
                  id="ratings"
                  name="ratings"
                  placeholder="Enter rating"
                  value={formData.rating}
                  onChange={handleChange}
                  
                />
              </div>
              <br></br>
              <div className="form-group text-left">
                <label htmlFor="total_ratings">Total Ratings</label>
                <input
                  type="text"
                  className="form-control"
                  id="total_ratings"
                  name="total_ratings"
                  placeholder="Enter total ratings"
                  value={formData.total_ratings}
                  onChange={handleChange}
                  
                />
              </div>

              <br></br>
              <div className="form-group text-left">
  <label htmlFor="category">Category</label>
  <select
    className="form-control"
    id="category"
    name="category"
    value={formData.category}
    onChange={handleChange}
  >
    {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
  </select>
</div>

              <br></br>

              <div className="form-group text-left">
                <label htmlFor="subcategory">Subcategory</label>
                <input
                  type="text"
                  className="form-control"
                  id="subcategory"
                  name="subcategory"
                  placeholder="Enter subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  
                />
              </div>
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
                    placeholder="Enter stock"
                    value={weights[index].stock}
                    onChange={(e)=>{handleWeightChange(index,"stock",e.target.value)}}
                    />
                    </div>
                    <br></br>
                  </>
                )
              })}

<button type="button" onClick={handleAddWeight}>Create Weight</button>
               <br></br>
               <br></br>
              
              </div>
              <br></br>
              <br></br>

              <button type="submit" className="btn btn-primary">
                Create
              </button>

              </form>
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
