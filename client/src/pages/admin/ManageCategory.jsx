import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import {Link,useNavigate} from 'react-router-dom';
import Modal from "antd/es/modal/Modal";
import CategoryForm from "../../components/Form/CategoryForm";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const navigate=useNavigate()

  const [search__,setSearch__] = useState('');


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

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"DashBoard - Manage Category"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>

            <button type="button" className="btn btn-primary" onClick={()=>navigate('/admin/create-category')}>
              Create Category
            </button>

            <br></br>
            <br></br>
            <div>
              <input type='text' value={search__} onChange={e => {setSearch__(e.target.value)}} className='my-2' placeholder="Search..." style={{border:'1px solid #656363',padding:'10px'}}/>
            </div>
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
                  {categories.filter((c)=>{
                    if (search__ === '') return c;
                    else if (c.category_name.toLowerCase().includes(search__.toLowerCase())){
                      return c;
                    }
                  }).map((c) => (
                    <>
                      <tr key={c.slug}>
                        <td>{c.category_id}</td>
                        <td>{c.category_name}</td>
                        <td>
                          
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              navigate(`/admin/update-category/${c.slug}`)
                            }}
                          >
                            Edit
                          </button>
                          <button
            className="btn btn-danger ms-2"
            onClick={() => {
              handleDelete(c.slug);
            }}
          >
            Delete
          </button>
          <Link to={`/admin/get-category/${c.slug}`}>
  <button className="btn btn-info ms-2">View</button>
</Link>
        </td>
      </tr>
    </>
  ))}



    
  </tbody>
</table>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export default ManageCategory
