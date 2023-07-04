import React, { useEffect, useState } from "react";
import Layout from "./../../../components/Layout/Layout";
import AdminMenu from "./../../../components/AdminMenu";
import toast from 'react-hot-toast';
import axios from "axios";
import {useParams,useNavigate} from 'react-router-dom';


const UpdateCategory = () => {
   const [catName,setCatName]=useState('')
   const [catId,setCatId]=useState('')
   const [subcategories,setSubcategories]=useState([])
    const params=useParams()
    const navigate=useNavigate()

    const getSingleCategory=async()=>{
        try{
        const {data}=await axios.get(`http://localhost:5000/api/categories/get-category/${params.slug}`)
        console.log(data)
        if(data?.success)
        {
            setCatName(data.category.category_name)
            setCatId(data.category.category_id)
            setSubcategories(data.category.subcategories)
            toast.success(data.message)
        }
        else{
             navigate('/admin/manage-category')
             toast.error(data.message)
        }}
        catch(error)
        {
            toast.error('Soemthing went wrong')
        }
    }
   useEffect(()=>{
       getSingleCategory()
   },[params.slug])

   const handleChange=(e)=>{
        if(e.target.name==="category id")
        setCatId(e.target.value)
        else
        setCatName(e.target.value)
   }

   const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const {data}=await axios.put(`http://localhost:5000/api/categories/update-category/${params.slug}`,{
                category_name:catName,
                category_id:catId,
                subcategories:subcategories
            })

            if(data?.success)
            {
                toast.success(data.message)
                navigate('/admin/manage-category')
            }
            else
            {
                toast.error(data.message)
            }
        }catch(error)
        {
            toast.error('Something went wrong')
        }
   }

  return (
    <Layout title={'Dashboard - Update category'}>
       <div className="container-fluid m-3 p-3 dashboard">
           <div className="row" style={{'margin-top':'2rem'}}>
               <div className="col-md-3">
                <AdminMenu/>
               </div>
               <div className="col-md-9">
                <h1 style={{'font-weight':'bold','padding-left':'17rem'}}>Update Category</h1>
                <br></br>
                <form onSubmit={handleSubmit} style={{'padding-left':'14rem'}}>
                    <div className="form-group text-left">
                        <label style={{'font-weight':'bold'}}>Category name</label>
                        <input 
                          type="text"
                          className="form-control"
                          placeholder="Enter category name"
                          name="category name"
                          value={catName}
                          onChange={handleChange}
                          style={{'width':'25rem','border':'2px solid #111'}}
                         />
                    </div>

                    <br></br>
                    <div className="form-group text-left">
                        <label style={{'font-weight':'bold'}}>Category Id</label>
                        <input 
                          type="text"
                          className="form-control"
                          name="category id"
                          placeholder="Enter category Id"
                          value={catId}
                          style={{'width':'25rem','border':'2px solid #111'}}
                         />
                    </div>

                    <br></br>
                    <h3 style={{'color':'red'}}>Sub categories cannot be edited</h3>
                    {subcategories.map((subcat,index)=>{
                        return(
                            <>
                            <br></br>
                            <div className="form-group text-left">
                            <label style={{'font-weight':'bold'}}>{`Sub category id ${index+1}`}</label>
                            <input 
                             type="text"
                            className="form-control"
                             placeholder="Enter subcategory Id"
                             name="subcategory_id"
                            value={subcat.subcategory_id}
                            style={{'width':'25rem','border':'2px solid #111'}}
                            />
                           </div>
                            <br></br>
                           <div className="form-group text-left">
                            <label style={{'font-weight':'bold'}}>{`Sub category name ${index+1}`}</label>
                            <input 
                             type="text"
                            className="form-control"
                             placeholder="Enter subcategory Name"
                             name="subcategory name"
                            value={subcat.subcategory_name}
                            style={{'width':'25rem','border':'2px solid #111'}}
                            />
                           </div>
                           </>
                        )
                    })}
                    <br></br>
                    <br></br>
                    <button type="submit" className="btn btn-primary" style={{'font-size':'1.5rem','width':'25rem'
                 ,'font-weight':'bold','border':'2px solid #111'}}>
                         Update category
                    </button>
                </form>
               </div>
           </div>
       </div>
    </Layout>
  )
}

export default UpdateCategory