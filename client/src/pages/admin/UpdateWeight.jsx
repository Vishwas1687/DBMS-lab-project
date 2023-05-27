import { useState, useEffect } from "react";
import {  useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";

const EditWeight = () => {
    const params=useParams()
    const navigate=useNavigate()
    const [weight, setWeight] = useState('');
    const [weight_units, setWeightUnits] = useState('');
    const [mrp, setMrp] = useState('');
    const [sp, setSp] = useState('');
    const [stock, setStock] = useState('');
    

    const getWeight=async()=>{
         try{ 
            const {data}=await axios.get(`http://localhost:5000/api/products/get-single-product/get-single-weight/${params.slug}/${params.weight_id}`)
            console.log(data)
            if(data.success)
            {
                setWeight(data.weights.weight)
                setWeightUnits(data.weights.weight_units)
                setMrp(data.weights.mrp)
                setSp(data.weights.sp)
                setStock(data.weights.stock)
            }
            else{
                toast.error(data.message)
            }
         }catch(error)
         {
              toast.error('Something went wrong')
         }
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{ 
            const {data}=await axios.put(`http://localhost:5000/api/products/get-single-product/${params.slug}/${params.weight_id}/edit`,{
                weight:weight,
                weight_units:weight_units,
                mrp:mrp,
                sp:sp,
                stock:stock
            })
            console.log(data)
            if(data.success)
            {
                toast.success(data.message)
                navigate(`/admin/manage-product/product/${params.slug}`)
            }
            else{
                toast.error(data.message)
            }
         }catch(error)
         {
             toast.error('Something went wrong')
         }
    }
    useEffect(()=>{
       getWeight()
    },[params.slug,params.weight_id])

  

  return (
    <Layout title={`Edit Weight`}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3 p-5">
            <AdminMenu />
          </div>
          <div className="col-md-9 p-5">
            <h1>Edit Weight</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="weight" className="form-label" >
                  Weight
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="weight"
                   value={weight}
                  onChange={(e)=>setWeight(e.target.value)} 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="weight_units" className="form-label">
                  Weight Units
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="weight_units"
                  name="weight_units"
                   value={weight_units}
                   onChange={(e)=>setWeightUnits(e.target.value)} 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mrp" className="form-label" >
                  MRP
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mrp"
                  name="mrp"
                  value={mrp}
                  onChange={(e)=>setMrp(e.target.value)} 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="sp" className="form-label" >
                  SP
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sp"
                  name="sp"
                  value={sp}
                  onChange={(e)=>setSp(e.target.value)} 
                />
                </div>
                <div className="mb-3">
                <label htmlFor="stock" className="form-label">
                  Stock
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="stock"
                  name="stock"
                   value={stock}
                   onChange={(e)=>setStock(e.target.value)} 
                />
                </div>
                <button type="submit" className="btn btn-primary" style={{'font-size':'1.5rem','width':'31rem'}}>
                    Update weight
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

export default EditWeight