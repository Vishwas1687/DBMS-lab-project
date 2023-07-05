import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import {baseUrl} from '../../baseUrl'

const EditCategory = ({ categoryName }) => {
  const [formData, setFormData] = useState({
    category_name: categoryName || "",
  })
  const [subCategories,setSubcategories]=useState([{
    subcategory_id:"",subcategory_name:""
  }])

  const handleSubmit = (event) => {
    event.preventDefault();
    // add functionality to update category name and subcategories
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubCategoryChange=(index,field,value)=>{
    
    const newSubCategories=[...subCategories]
    newSubCategories[index][field]=value
    setSubcategories(newSubCategories)
 }

  return (
    
    <Layout title={"Dashboard-Create Category"}>
      <br></br>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-10 create-category-section">
            <h1>Edit Category</h1>
            <br></br>
            <form onSubmit={handleSubmit}>
      <div className="form-group text-left">
                <label htmlFor="category_name">Category New Name</label>
                <br></br>
                <input
                  type="text"
                  className="form-control"
                  id="category_name"
                  name="category_name"
                  placeholder="Enter category name"
                  value={formData.category_name}
                  onChange={handleChange}
                />
              </div>
              <br></br>
              {subCategories.map((subcat,index)=>{
                return (
                  <>
                    <div className="form-group text-left">
                    <label>{`Subcategory id ${index+1}`}</label>
                    <input
                    type="text"
                    className="form-control"
                    name="subcategory_id"
                    placeholder="Enter subcategory id"
                    value={subCategories[index].subcategory_id}
                    onChange={(e)=>{handleSubCategoryChange(index,"subcategory_id",e.target.value)}}
                    />
                    </div>
                    <br></br>
                    <div className="form-group text-left">
                    <label>{`Subcategory name ${index+1}`}</label>
                    <input
                    type="text"
                    className="form-control"
                    name="subcategory_name"
                    placeholder="Enter subcategory name"
                    value={subCategories[index].subcategory_name}
                    onChange={(e)=>{handleSubCategoryChange(index,"subcategory_name",e.target.value)}}
                    />
                    </div>
                    <br></br>
                  </>
                )
              })}
        <button className="btn btn-success ms-2">Save</button>
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
  );
};

export default EditCategory;
