import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import {  message } from "antd";
import { Modal } from "antd";
import CategoryForm from "../../components/Form/CategoryForm";
const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/categories/create-category",
        { category_id:id,category_name: name }
      );
      if (data.success) {
        toast.success(`${data.name} is created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async ({ category_name, slug }, e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/categories/update-category/${slug}`,
        { category_name }
      );
      if (data?.success) {
        toast.success(`${category_name} is updated`);
        setSelected(null);
        setUpdatedName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      toast.error("Somtihing went wrong");
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
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.category_name);
                              setSelected(c);
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
        </td>
      </tr>
      {c.subcategories.length > 0 && (
        <tr key={`${c.slug}-subcategories`}>
          <td colSpan="3">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Subcategory Name</th>
                </tr>
              </thead>
              <tbody>
                {c.subcategories.map((sub) => (
                  <tr key={sub.slug}>
                    <td>{sub.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
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
    handleSubmit={(e) => handleUpdate(selected, e)}
  />
</Modal>

                    </div>
                </div>
            </div>
        </Layout>
    )
}






export default ManageCategory
