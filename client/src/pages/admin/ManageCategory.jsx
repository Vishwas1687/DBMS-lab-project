import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import {Link} from 'react-router-dom';

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);



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
                  {categories.map((c) => (
                    <>
                      <tr key={c.slug}>
                        <td>{c.category_id}</td>
                        <td>{c.category_name}</td>
                        <td>
                          <Link to={`/admin/update-category/${c.slug}`}>
                          <button
                            className="btn btn-primary ms-2"
                          >
                            Edit
                          </button>
                          </Link>
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
