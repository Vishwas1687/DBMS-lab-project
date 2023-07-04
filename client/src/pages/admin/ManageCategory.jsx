import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import {Link,useNavigate} from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import Modal from "antd/es/modal/Modal";
import CategoryForm from "../../components/Form/CategoryForm";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const navigate=useNavigate()
  const [deleteModal,setDeleteModal]=useState(false)
  const [numberOfDeleteProducts,setNumberOfDeleteProducts]=useState(0)
  const [search__,setSearch__] = useState('');
  const [selected,setSelected]=useState({})


  const handleDelete = async (slug) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/categories/delete-category/${slug}`
      );
      if (data.success) {
        toast.success(`category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

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

  const getDocumentProducts=async(slug)=>{
       try{
          const {data}=await axios.get(`http://localhost:5000/api/products/get-total-products-in-category-page/${slug}`)
          if(data?.success)
          {
            setNumberOfDeleteProducts(data.count)
            if(data.count==0)
            {
               handleDelete(slug)
            }
            else
            setDeleteModal(true)
          }
       }catch{
          toast.error('Something went wrong')
       }
    }

  useEffect(() => {
    getAllCategory();
  }, []);

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
    <Layout title={"DashBoard - Manage Category"}>
      <div className="container-fluid dashboard">
        <div className="row">
          <div className="col-md-3" style={{'margin-top':'2rem'}}>
            <AdminMenu />
          </div>
          <div className="col-md-7" style={{'margin-top':'2rem'}}>
            <h1>Manage Category</h1>

            <button type="button" className="btn btn-primary" 
            style={{'border':'2px solid #111'}} onClick={()=>navigate('/admin/create-category')}>
              Create Category
            </button>

            <br></br>
            <br></br>
            <div>
                  <input type='text' value={search__} onChange={e => {setSearch__(e.target.value)}} className='mb-5' placeholder="Search..." style={{border:'2px solid #656363',padding:'10px'}}/> 
                   {search__ ? <AiOutlineClose style={{'font-size':'2.9rem','border':'2px solid #111'}} id="clearBtn" onClick={()=>{setSearch__("")}}/> :  <BiSearch style={{'font-size':'2.9rem','border':'2px solid #111'}}/>}
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th style={tableHeaderStyle} scope="col">ID</th>
                    <th style={tableHeaderStyle} scope="col">Name</th>
                    <th style={tableHeaderStyle} scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.filter((c)=>{
                    if (search__ === '') return c;
                    else if (c.category_name.toLowerCase().includes(search__.toLowerCase())){
                      return c;
                    }
                  }).map((c,index) => (
                    <>
                      <tr key={c.slug} style={{backgroundColor:index%2==1?'#4CAF50':'#3CB371'}}>
                        <td style={tableCellStyle}>{c.category_id}</td>
                        <td style={tableCellStyle}>{c.category_name}</td>
                        <td style={tableCellStyle}>
                          
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              navigate(`/admin/update-category/${c.slug}`)
                            }}
                            style={editButtonStyle}
                          >
                            Edit
                          </button>
                          <button
            className="btn btn-danger ms-2"
            style={deleteButtonStyle}
            onClick={() => {
              getDocumentProducts(c.slug);
              setSelected(c);
            }}
          >
            Delete
          </button>
          <Link to={`/admin/get-category/${c.slug}`}>
  <button className="btn btn-info ms-2"
  style={viewButtonStyle}>View</button>
</Link>
        </td>
      </tr>
    </>
  ))}



    
  </tbody>
</table>

                        </div>
                    </div>
<Modal onCancel={()=>setDeleteModal(false)}
            footer={null}
            visible={deleteModal}>
          <div>
            <h3 style={{'color':'red'}}>{`Do you want to really delete the category ${selected.category_name}`}</h3>
            <h5 style={{'font-weight':'bold'}}>{`The Category contains ${numberOfDeleteProducts} products`}</h5>
             <button className="btn btn-primary" type="button" 
               onClick={(e)=>{handleDelete(selected.slug);setDeleteModal(false)}}
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


export default ManageCategory
