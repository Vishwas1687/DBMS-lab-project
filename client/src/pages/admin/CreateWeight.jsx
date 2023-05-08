import React,{useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useState } from 'react'
import { useParams,useNavigate} from 'react-router-dom'


const CreateWeight = ({ weightId, weight , weightUnits , mrp, sp, stock }) => {

    const [formData, setFormData] = useState({
        weight_id: weightId || "",
        weight: weight || "",
        weight_units: weightUnits || "",
        mrp: mrp || "",
        sp : sp || "",
        stock: stock || "",
      });

      const params=useParams()
      const navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formDataWithWeights={
            weight_id:formData.weight_id,
            weight:formData.weight,
            weight_units:formData.weight_units,
            mrp:formData.mrp,
            sp:formData.sp,
            stock:formData.stock
          }
          const { data } = await axios.post(
            `http://localhost:5000/api/products/get-single-product/${params.slug}/create-weights`,
            formDataWithWeights
          );
          if (data?.success) {
            toast.success(`Weight ${formData.weight} ${formData.weight_units} is added`)
            setFormData({
              weight_id: "",
              weight: "",
              weight_units: "",
              mrp: "",
              sp: "",
              stock: "",
            });
            navigate(`/admin/manage-product/product/${params.slug}`)

          } else {
            toast.error(data.message);
          }
        } catch (error) {
            toast.error('Something went wrong')
        }
      };

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            <h1>Create Weight</h1>
            <br></br>
            <form onSubmit={handleSubmit}>
              <div className="form-group text-left">
                <label htmlFor="weight_id">Weight ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="weight_id"
                  name="weight_id"
                  placeholder="Enter weight id"
                  value={formData.weight_id}
                  onChange={handleChange}
                />
              </div>
              <br></br>
              <div className="form-group text-left">
                <label htmlFor="weight">Weight</label>
                <input
                  type="text"
                  className="form-control"
                  id="weight"
                  name="weight"
                  placeholder="Enter weight"
                  value={formData.weight}
                  onChange={handleChange}
                  
                />
              </div>
              <br></br>
              <div className="form-group text-left">
                <label htmlFor="weight_units">Weight Units</label>
                <input
                  type="text"
                  className="form-control"
                  id="weight_units"
                  name="weight_units"
                  placeholder="Enter weight units"
                  value={formData.weight_units}
                  onChange={handleChange}
                  
                />
              </div>
              <br></br>
              <div className="form-group text-left">
                <label htmlFor="mrp">MRP</label>
                <input
                  type="text"
                  className="form-control"
                  id="mrp"
                  name="mrp"
                  placeholder="Enter MRP"
                  value={formData.mrp}
                  onChange={handleChange}
                  
                />
              </div>
              <br></br>
              <div className="form-group text-left">
                <label htmlFor="sp">SP</label>
                <input
                  type="text"
                  className="form-control"
                  id="sp"
                  name="sp"
                  placeholder="Enter SP"
                  value={formData.sp}
                  onChange={handleChange}
                  
                />
              </div>
              <br></br>
              <div className="form-group text-left">
                <label htmlFor="stock">Stock</label>
                <input
                  type="text"
                  className="form-control"
                  id="stock"
                  name="stock"
                  placeholder="Enter stock"
                  value={formData.stock}
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

export default CreateWeight
