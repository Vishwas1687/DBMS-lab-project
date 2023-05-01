import { useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";

const CreateCategory = () => {
  const [formData, setFormData] = useState({
    category_id: "",
    category_name: "",
    subcategories: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/categories/create-category",
        formData
      );
      if (data?.success) {
        alert(`${formData.category_name} is added`);
        setFormData({
          category_id: "",
          category_name: "",
          subcategories: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Dashboard-Create Category"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-10">
            <h1>Create Category</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="category_id">Category ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="category_id"
                  name="category_id"
                  placeholder="Enter category id"
                  value={formData.category_id}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category_name">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="category_name"
                  name="category_name"
                  placeholder="Enter category name"
                  value={formData.category_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subcategories">Subcategories</label>
                <textarea
                  className="form-control"
                  id="subcategories"
                  name="subcategories"
                  placeholder="Enter subcategories (separated by comma)"
                  value={formData.subcategories}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
