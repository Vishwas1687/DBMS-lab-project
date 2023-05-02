import React, { useEffect, useState } from "react";
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { toast } from "react-hot-toast";
import axios from "axios";

const ViewCategory = () => {

    const [categories, setCategories] = useState([]);

    const getSingleCategory = async(e) =>{
        try{
            const {data} = await axios.get("http://localhost:5000/api/categories/get-category/:slug");
            if (data?.success) {
                setCategories(data?.categories);
                toast.success('Category ${category.category_name} is fetched')

              }

        }catch(error){
            console.log(error);
            toast.error("Something went wrong");

        }

    }
  return (
    <Layout title = {"Dashboard - View Category"}>
        <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>View {categories.category_name} Category</h1>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Subcategories</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((c) => (
                    <>
                      <tr key={c.slug}>
                        <td>{c.category_name}</td>
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

export default ViewCategory
