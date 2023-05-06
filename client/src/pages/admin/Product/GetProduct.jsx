import React, { useEffect, useState } from "react";
import Layout from "./../../../components/Layout/Layout";
import AdminMenu from "./../../../components/AdminMenu";
import toast from 'react-hot-toast';
import axios from "axios";
import {Link,useParams} from 'react-router-dom';
import {  message } from "antd";
import { Modal } from "antd";
import CategoryForm from "../../../components/Form/CategoryForm";


const GetProduct = () => {
    const [products, setProducts] = useState([]);
    const [prod,setProd]=useState({})
    const [prodid,setProdID] = useState({})
    const [prodbrand,setProdBrand]=useState({})
    const [prodcat,setProdCat]=useState({})
    const [prodsubcat,setProdSubCat]=useState({})
    const [prodweight,setProdWeight]=useState({})
    const [selected,setSelected]=useState({})
    const [visible,setVisible]=useState(false)
    const [createVisible,setCreateVisible]=useState(false)
    const params=useParams()

    const getCategory = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/products/get-single-product/:slug`);
            if(data?.success)
            {
               setProd(data.product)
            }
            else{
              
            }
        } catch (error) {
            
        }
    };
    
    
   
    

 






    return (
      
    <Layout title={"DashBoard - Manage Category"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3 p-5">
            <AdminMenu />
          </div>
          <div className="col-md-9 p-5">
             <h1 className="pb-3">{prod.product_name}</h1>
             <h2 className="mb-4">{`Category id : ${prod.product_id}`}</h2>
             <table className="table w-75">
                <thead>
                 <tr>
                  <th scope="col">Seller ID</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Weights</th>
                  <th scope="col">Category</th>
                  <th scope="col">Subcategory</th>
                  <th scope="col">Actions</th>
                 </tr>
                </thead>
                <tbody>
                    {products.map((c) => (
                        <>
                        <tr key={c.slug}>
                        <td>{c.seller_id}</td>
                        <td>{c.brand}</td>
                        <td></td>
                        </tr>
                        
                        </>
                    ))}
                </tbody>

             </table>
          </div>

        </div>
      </div>
    </Layout>
    )
}

export default GetProduct