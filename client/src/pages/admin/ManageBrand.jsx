import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/AdminMenu';
import { toast } from 'react-hot-toast';
import CategoryForm from '../../components/Form/CategoryForm';
import Modal from 'antd/es/modal/Modal';

const ManageBrand = () => {

    const [brands, setBrands] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [createVisible,setCreateVisible]=useState(false)
    const [brand,setBrand]=useState('')

    // useEffect(() => {
    //     axios.get('/api/brands').then((response) => {
    //       setBrands(response.data);
    //     });
    //   }, []);


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
            setSelected(null);
            setVisible(false)
            setUpdatedName("");
            getAllBrand();
          } else {
            toast.error(data.message);
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
            toast.success(`brand is deleted`);
    
            getAllBrand();
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      };

  return (
    <>
    <Layout  title = {"Dashboard- Manage Brand"}>
    <div className="container-fluid m-3 p-3 dashboard">
    <div className="row">
    <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Brand</h1>
            <br></br>

            <button type="button" className='btn btn-primary' onClick={()=>setCreateVisible(true)}>
               Create Brand
            </button>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>          
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {brands?.map((c) => (

                    <>
                    <tr key={c.brand_name}>
                        <td>{c.brand_id}</td>
                        <td>{c.brand_name}</td>
                        <td>
                        <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.brand_name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
<button className="btn btn-danger ms-2"
onClick={() => {
    handleDeleteBrand(c.brand_id)
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
    handleSubmit={(e) => handleUpdateBrand(selected, e)}
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

            </div>
    </div>
    </div>
</Layout>     
    </>
  )
}

export default ManageBrand
