import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/AdminMenu';
import { toast } from 'react-hot-toast';
import CategoryForm from '../../components/Form/CategoryForm';
import Modal from 'antd/es/modal/Modal';
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

const ManageBrand = () => {

    const [brands, setBrands] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState({});
    const [updatedName, setUpdatedName] = useState("");
    const [createVisible,setCreateVisible]=useState(false)
    const [brand,setBrand]=useState('')
    const [search__,setSearch__] = useState('');
    const [deleteModal,setDeleteModal]=useState(false)
    const [numberOfDeleteProducts,setNumberOfDeleteProducts]=useState(0)
    const [selectUpdate,setSelectUpdate]=useState({})


    const getAllBrand = async() => {

        try{
    
          const {data} = await axios.get("http://localhost:5000/api/brands/get-all-brands");
          if(data?.success){
    
            setBrands(data?.brands)
          }
        }catch(error){
    
          console.log(error)
          toast.error("Something went wrong in getting brand");
        }
      }
    
      useEffect(() => {
        getAllBrand();
      }, []);

      const handleCreateBrand = async (e,brand_name) => {
        e.preventDefault();
        try {
          const { data } = await axios.post(
            `http://localhost:5000/api/brands/create-brand`,
            { brand_name }
          );
          if (data?.success) {
            toast.success(`${brand_name} is created`);
            setCreateVisible(false)
            setBrand('')
            getAllBrand();
          } else {
            toast.error(data.message);
            setBrand('')
          }
        } catch (error) {
          console.log(error);
        }
      };



      const handleUpdateBrand = async ({brand_id, brand_name}, e) => {
        e.preventDefault();
        try {
          const { data } = await axios.put(
            `http://localhost:5000/api/brands/update-brand/${brand_id}`,
            { brand_name:updatedName }
          );
          if (data?.success) {
            toast.success(`${updatedName} is updated`);
            setSelectUpdate({});
            setVisible(false)
            setUpdatedName("");
            getAllBrand();
          } else {
            toast.error(data.message);
            setUpdatedName('')
          }
        } catch (error) {
          console.log(error);
        }
      };

      const handleDeleteBrand = async (brand_id) => {
        try {
          const { data } = await axios.delete(
            `http://localhost:5000/api/brands/delete-brand/${brand_id}`
          );
          if (data.success) {
            toast.success(data.message);
            getAllBrand();
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      };


 const getDocumentProducts=async(brand_id)=>{
       try{
          const {data}=await axios.get(`http://localhost:5000/api/products/get-total-products-by-brand/${brand_id}`)
          if(data?.success)
          {
            setNumberOfDeleteProducts(data.count)
            if(data.count==0)
            {
               handleDeleteBrand(selected.brand_id)
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
  fontWeight:'bold',
  fontFamily: 'Arial, sans-serif',
  color:'black'
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
    <>
    <Layout  title = {"Dashboard- Manage Brand"}>
    <div className="container-fluid dashboard">
    <div className="row">
    <div className="col-md-3" style={{'margin-top':'2rem'}}>
            <AdminMenu />
          </div>
          <div className="col-md-7" style={{'margin-top':'2rem'}}>
            <h1>Manage Brand</h1>
            <br></br>

            <button type="button" className='btn btn-primary' 
            style={{'margin-bottom':'2rem','border':'2px solid #111'}} onClick={()=>setCreateVisible(true)}>
               Create Brand
            </button>
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
                  {brands?.filter((c)=>{
                    if (search__ === '') return c;
                    else if (c.brand_name.toLowerCase().includes(search__.toLowerCase())){
                      return c;
                    }
                  }).map((c,index) => (

                    <>
                    <tr key={c.brand_name} style={{backgroundColor:index%2==1?'#4CAF50':'#3CB371'}}>
                        <td style={tableCellStyle}>{c.brand_id}</td>
                        <td style={tableCellStyle}>{c.brand_name}</td>
                        <td style={tableCellStyle}>
                        <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.brand_name);
                              setSelectUpdate(c);
                            }}
                            style={editButtonStyle}
                          >
                            Edit
                          </button>
<button className="btn btn-danger ms-2"
style={deleteButtonStyle}
onClick={() => {
    getDocumentProducts(c.brand_id);
    setSelected(c);
  }}>

    

Delete
</button>


</td>

                    </tr>
                    </>
                  ))}
                </tbody>
                </table>
            </div>
            <Modal
  onCancel={() => setVisible(false)}
  footer={null}
  visible={visible}
>
  <CategoryForm
    value={updatedName}
    setValue={setUpdatedName}
    handleSubmit={(e) => handleUpdateBrand(selectUpdate, e)}
  />
</Modal>
    <Modal
  onCancel={() => setCreateVisible(false)}
  footer={null}
  visible={createVisible}
>
  <CategoryForm
    value={brand}
    setValue={setBrand}
    handleSubmit={(e) => handleCreateBrand(e,brand)}
  />
</Modal>

<Modal onCancel={()=>setDeleteModal(false)}
            footer={null}
            visible={deleteModal}>
          <div>
            <h3 style={{'color':'red'}}>{`Do you want to really delete the brand ${selected.brand_name}`}</h3>
            <h5 style={{'font-weight':'bold'}}>{`The Brand contains ${numberOfDeleteProducts} products`}</h5>
             <button className="btn btn-primary" type="button" 
               onClick={(e)=>{handleDeleteBrand(selected.brand_id);setDeleteModal(false)}}
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
    </div>
</Layout>     
    </>
  )
}

export default ManageBrand
