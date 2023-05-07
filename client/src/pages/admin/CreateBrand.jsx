import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/AdminMenu';

const CreateBrand = ({ brandName}) => {

    const [formData, setFormData] = useState({
        // brand_id: brandId || "",
        brand_name: brandName || "",
      });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formDataWithBrands={
            brand_name:formData.brand_name,
          }
          const { data } = await axios.post(
            "http://localhost:5000/api/brands/create-brand",
            formDataWithBrands
          );
          if (data?.success) {
            alert(`${formData.brand_name} is added`);
            setFormData({
            //   brand_id: "",
              brand_name: "",
            });
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
        
  return (
    <>
    <Layout title={"Dashboard-Create Category"}>
      <br></br>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-10 create-category-section">
            <h1>Create Brand</h1>
            <br></br>
            <form onSubmit={handleSubmit}>
              <br></br>
              <div className="form-group text-left">
                <label htmlFor="brand_name">Brand Name</label>
                <br></br>
                <input
                  type="text"
                  className="form-control"
                  id="brand_name"
                  name="brand_name"
                  placeholder="Enter brand name"
                  value={formData.brand_name}
                  onChange={handleChange}
                />
              </div>
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
    </>
  )
}

export default CreateBrand
