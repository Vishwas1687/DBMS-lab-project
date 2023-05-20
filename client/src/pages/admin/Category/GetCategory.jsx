import React, { useEffect, useState } from "react";
import Layout from "./../../../components/Layout/Layout";
import AdminMenu from "./../../../components/AdminMenu";
import toast from 'react-hot-toast';
import axios from "axios";
import {useParams} from 'react-router-dom';
import { Modal } from "antd";


const GetCategory = () => {
    const [cat,setCat]=useState({})
    const [newSubCat,setNewSubCat]=useState({
      subcategory_id:'',
      subcategory_name:''
    })
    const [selected,setSelected]=useState({})
    const [visible,setVisible]=useState(false)
    const [createVisible,setCreateVisible]=useState(false)
    const params=useParams()
  const [search__,setSearch__] = useState('');

    
     const getCategory = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/categories/get-category/${params.slug}`);
                if(data?.success)
                {
                   setCat(data.category)
                   toast.success(data.message)
                }
                else{
                  toast.error(data.message)
                }
            } catch (error) {
                toast.error('Something went wrong')
            }
        };
   
    

  const handleUpdate=async(e)=>{
      e.preventDefault()
      try{
           const {data}=await axios.put(`http://localhost:5000/api/categories/get-category/${cat.slug}/${selected.subcategory_id}/edit`,
           {
            subcategory_name:selected.subcategory_name
           })
           if(data?.success)
           {
              setVisible(false)
              setSelected({})
              getCategory()
           }
      }catch(error)
      {

      }
  }

  const handleDelete=async(e,subcat)=>{
    e.preventDefault()
      try{
        console.log(subcat)
        const {data}=await axios.delete(`http://localhost:5000/api/categories/get-category/${cat.slug}/${subcat.subcategory_id}/delete`) 
        console.log(data)
        if(data?.success)
        {
            console.log(data.message)
            getCategory()
        }
        else{
           console.log(data.message)
        }
      }catch(error)
      {
            console.log(error)
      }
  }

  const handleUpdateChange=(e)=>{
     setSelected({...selected,[e.target.name]:e.target.value})
  }

  const handleCreate=async(e)=>{
      e.preventDefault()
      try{
        const {data}=await axios.post(`http://localhost:5000/api/categories/get-category/${cat.slug}/new`,{
            subcategory_id:newSubCat.subcategory_id,subcategory_name:newSubCat.subcategory_name
        })
        if(data?.success)
        {
          setCreateVisible(false)  
          getCategory()
          toast.success(data.message)
        }
      }catch(error)
      {
           console.log(error)
      }
  }

    useEffect(() => {
        getCategory();
    }, [params.slug]);

    return (
      
    <Layout title={"DashBoard - Get Category"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3 p-5">
            <AdminMenu />
          </div>
          <div className="col-md-9 p-5">
             <h1 className="pb-3">{cat.category_name}</h1>
             <h2 className="mb-4">{`Category id : ${cat.category_id}`}</h2>
             <button className="btn btn-primary mb-4"
               onClick={()=>setCreateVisible(true)}>Create Sub category</button>
               <div>
              <input type='text' value={search__} onChange={e => {setSearch__(e.target.value)}} className='my-2' placeholder="Search..." style={{border:'1px solid #656363',padding:'10px'}}/>
            </div>
             <table className="table w-75">
                <thead>
                 <tr>
                  <th scope="col">Subcategory id</th>
                  <th scope="col">Subcategory name</th>
                  <th scope="col">Actions</th>
                 </tr>
                </thead>
                <tbody>
                  {cat.subcategories && cat.subcategories.filter((c)=>{
                  if (search__ === '') return c;
                  else if (c.subcategory_name.toLowerCase().includes(search__.toLowerCase())){
                    return c;
                  }
                }).map((subcat,index)=>{
                    return (
                      <>
                         <tr key={index}>
                            <td>
                              {subcat.subcategory_id}
                            </td>
                            <td>
                              {subcat.subcategory_name}
                            </td>
                            <td>
                               <button type="button" className="btn btn-primary ms-2"
                                  onClick={()=>
                                    {  setSelected(subcat);
                                       setVisible(true);
                                    }}>
                                  Edit
                               </button>
                               <button type="button" className="btn btn-danger ms-2"
                                 onClick={(e)=>{setSelected(subcat);
                                  handleDelete(e,subcat)
                                   }}>
                                  Delete
                               </button>
                            </td>
                         </tr>
                      </>
                    )
                  })}
                </tbody>
             </table>
          </div>
          <Modal onCancel={()=>setVisible(false)}
            footer={null}
            visible={visible}>
          <div>
            <label className="mb-2">Sub category name</label>
            <input type="text" className="form-control" name="subcategory_name"
              placeholder="Enter sub category name"
              value={selected.subcategory_name} onChange={(e)=>handleUpdateChange(e)}
             />
             <br></br>
             <button className="btn btn-primary" type="button" 
               onClick={(e)=>handleUpdate(e)}>
              Edit subcategory
             </button>
          </div>
          </Modal>


          <Modal onCancel={()=>setCreateVisible(false)}
            footer={null}
            visible={createVisible}>
          <div>
            <label className="mb-2">Sub category id</label>
            <input type="text" className="form-control" name="subcategory_id"
              placeholder="Enter sub category id"
              value={newSubCat.subcategory_id}
               onChange={(e)=>setNewSubCat({...newSubCat,[e.target.name]:e.target.value})}
             />
             <br></br>
             <label className="mb-2">Sub category name</label>
            <input type="text" className="form-control" name="subcategory_name"
              placeholder="Enter sub category name"
              value={newSubCat.subcategory_name}
               onChange={(e)=>setNewSubCat({...newSubCat,[e.target.name]:e.target.value})}
             />
             <br></br>
             <button className="btn btn-primary" type="button" 
               onClick={(e)=>handleCreate(e)}>
              Create subcategory
             </button>
          </div>
          </Modal>

        </div>
      </div>
    </Layout>
    )
}

export default GetCategory