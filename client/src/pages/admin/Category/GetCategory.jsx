import React, { useEffect, useState } from "react";
import Layout from "./../../../components/Layout/Layout";
import AdminMenu from "./../../../components/AdminMenu";
import toast from 'react-hot-toast';
import axios from "axios";
import {useParams,Link} from 'react-router-dom';
import { Modal } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import {baseUrl} from '../../../baseUrl'


const GetCategory = () => {
    const [cat,setCat]=useState({})
    const [newSubCat,setNewSubCat]=useState({
      subcategory_id:'',
      subcategory_name:''
    })
    const [selected,setSelected]=useState({})
    const [deleteModal,setDeleteModal]=useState(false)
    const [visible,setVisible]=useState(false)
    const [createVisible,setCreateVisible]=useState(false)
    const [numberOfDeleteProducts,setNumberOfDeleteProducts]=useState(0)
    const params=useParams()
  const [search__,setSearch__] = useState('');

    
     const getCategory = async () => {
            try {
                const { data } = await axios.get(`${baseUrl}/api/categories/get-category/${params.slug}`);
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
           const {data}=await axios.put(`${baseUrl}/api/categories/get-category/${cat.slug}/${selected.subcategory_id}/edit`,
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
        
        const {data}=await axios.delete(`${baseUrl}/api/categories/get-category/${cat.slug}/${subcat.subcategory_id}/delete`) 
        if(data?.success)
        {
            console.log(data.message)
            getCategory()
            toast.success('Sub category successfully deleted')
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
        const {data}=await axios.post(`${baseUrl}/api/categories/get-category/${cat.slug}/new`,{
            subcategory_id:newSubCat.subcategory_id,subcategory_name:newSubCat.subcategory_name
        })
        if(data?.success)
        {
          setCreateVisible(false)  
          getCategory()
          toast.success(data.message)
        }
        else{
          toast.error(data.message)
        }
      }catch(error)
      {
           toast.error('Something went wrong')
      }
  }

    useEffect(() => {
        getCategory();
    }, [params.slug]);


    const getDocumentProducts=async(e,subcat)=>{
       try{
          const {data}=await axios.get(`${baseUrl}/api/products/get-total-products-in-subcategory-page/${params.slug}/${subcat.subcategory_id}`)
          if(data?.success)
          {
            setNumberOfDeleteProducts(data.count)
            if(data.count==0)
            {
               handleDelete(e,subcat)
            }
            else
            setDeleteModal(true)
          }
       }catch{
          toast.error('Something went wrong')
       }
    }

const tableHeaderStyle = {
  backgroundColor: '#006400',
  color: '#fff',
  padding: '10px',
  textAlign: 'left',
  fontWeight: 'bold',
  border: '2px solid #111',
  fontFamily: 'Arial, sans-serif',
};

const tableCellStyle = {
  padding: '10px',
  borderBottom: '2px solid #000',
  borderRight: '2px solid #000',
  fontFamily: 'Arial, sans-serif',
  color:'black',
  fontWeight:'bold'
};

const viewButtonStyle = {
  backgroundColor: 'green',
  color: '#fff',
  border:'2px solid #000',
  padding: '8px 8px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontFamily: 'Arial, sans-serif',
};

const editButtonStyle = {
  backgroundColor: 'blue',
  color: '#fff',
  border:'2px solid #000',
  padding: '8px 8px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontFamily: 'Arial, sans-serif',
};

const deleteButtonStyle = {
  backgroundColor: 'red',
  color: '#fff',
  border:'2px solid #000',
  padding: '8px 8px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontFamily: 'Arial, sans-serif',
};

const noOrdersCellStyle = {
  padding: '10px',
  textAlign: 'center',
  fontStyle: 'italic',
  backgroundColor: '#f5f5f5',
  fontFamily: 'Arial, sans-serif',
};

const loadingCellStyle = {
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#f5f5f5',
  fontFamily: 'Arial, sans-serif',
};       

    return (
      
    <Layout title={"DashBoard - Get Category"}>
      <div className="container-fluid dashboard">
        <div className="row">
          <div className="col-md-3 p-5" style={{'margin-top':'2rem'}}>
            <AdminMenu />
          </div>
          <div className="col-md-9 p-5" style={{'margin-top':'2rem'}}>
             <h1 className="pb-3">{cat.category_name}</h1>
             <h2 className="mb-4">{`Category id : ${cat.category_id}`}</h2>
             <button className="btn btn-primary mb-4" style={{'border':'2px solid #111'}}
               onClick={()=>setCreateVisible(true)} >Create Sub category</button>
            <div>
                  <input type='text' value={search__} onChange={e => {setSearch__(e.target.value)}} className='mb-5' placeholder="Search..." style={{border:'2px solid #656363',padding:'10px'}}/> 
                   {search__ ? <AiOutlineClose style={{'font-size':'2.9rem','border':'2px solid #111'}} id="clearBtn" onClick={()=>{setSearch__("")}}/> :  <BiSearch style={{'font-size':'2.9rem','border':'2px solid #111'}}/>}
            </div>
             <table className="table w-75">
                <thead>
                 <tr>
                  <th style={tableHeaderStyle} scope="col">Subcategory id</th>
                  <th style={tableHeaderStyle} scope="col">Subcategory name</th>
                  <th style={tableHeaderStyle}scope="col">Actions</th>
                 </tr>
                </thead>
                <tbody>
                  {cat.subcategories && cat.subcategories.filter((c)=>{
                  if (search__ === '') return c;
                  else if (c.subcategory_name.toLowerCase().includes(search__.toLowerCase())){
                    return c;
                  }
                }).sort((a, b) => a.subcategory_name.localeCompare(b.subcategory_name))
                .map((subcat,index)=>{
                    return (
                      <>
                         <tr key={index} style={{backgroundColor:index%2==1?'#4CAF50':'#3CB371'}}>
                            <td style={tableCellStyle}>
                              {subcat.subcategory_id}
                            </td>
                            <td style={tableCellStyle}>
                              {subcat.subcategory_name}
                            </td>
                            <td style={tableCellStyle}>
                               <button type="button" className="btn btn-primary ms-2"
                                  onClick={()=>
                                    {  setSelected(subcat);
                                       setVisible(true);
                                    }}
                                    style={editButtonStyle}>
                                  Edit
                               </button>
                               <button type="button" className="btn btn-danger ms-2"
                               style={deleteButtonStyle}
                                 onClick={(e)=>{setSelected(subcat);
                                  getDocumentProducts(e,subcat)
                                   }}>
                                  Delete
                               </button>
                              <Link to={`/admin/get-subcategory-page/product/${cat.slug}/${subcat.subcategory_id}`}>
                               <button type="button" className="btn btn-danger ms-2"
                               style={viewButtonStyle}
                                 >
                                  {`View ${subcat.subcategory_name} products`}
                               </button>
                               </Link>
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
 
          <Modal onCancel={()=>setDeleteModal(false)}
            footer={null}
            visible={deleteModal}>
          <div>
            <h3 style={{'color':'red'}}>{`Do you want to really delete the subcategory ${selected.subcategory_name}`}</h3>
            <h5 style={{'font-weight':'bold'}}>{`The Subcategory contains ${numberOfDeleteProducts} products`}</h5>
             <button className="btn btn-primary" type="button" 
               onClick={(e)=>{handleDelete(e,selected);setDeleteModal(false)}}
               style={{'background-color':'red','color':'white','margin-right':'2rem'}}>
              Delete all products
             </button>
             <button className="btn btn-primary" type="button" 
               onClick={(e)=>{setDeleteModal(false)}}>
              Cancel
             </button>
          </div>
          </Modal>



        </div>
      </div>
    </Layout>
    )
}

export default GetCategory