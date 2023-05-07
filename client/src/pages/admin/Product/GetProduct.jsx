import React, { useEffect, useState } from "react";
import Layout from "./../../../components/Layout/Layout";
import AdminMenu from "./../../../components/AdminMenu";
import toast from 'react-hot-toast';
import axios from "axios";
import {Link,useParams} from 'react-router-dom';



const GetProduct = () => {
  const [prod, setProd] = useState({});

  const params = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/get-single-product/${params.slug}`);
        if (data?.success) {
          setProd(data.existingProduct);
        } else {
          toast.error(data?.message || 'Failed to fetch product.');
        }
      } catch (error) {
        toast.error('Something went wrong.');
      }
    };

    getProduct();
  }, [params]);

  return (
    <Layout title="DashBoard - Manage Category">
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3 p-5">
            <AdminMenu />
          </div>
          <div className="col-md-9 p-5">
            <h1 className="pb-3">{prod.product_name}</h1>
            <h2 className="mb-4">{`Product ID: ${prod.product_id}`}</h2>
            <div className="mb-4">
              <img src={`http://localhost:5000/${prod.photo}`} alt={prod.product_name} style={{ maxWidth: "100%" }} />
            </div>
            <table className="table w-75">
              <thead>
                <tr>
                  <th scope="col">Seller ID</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Category</th>
                  <th scope="col">Subcategory</th>
                  <th scope="col">Tags</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{prod.seller_id}</td>
                  <td>{prod.brand?.brand_name}</td>
                  <td>{prod.category?.category_name}</td>
                  <td>{prod.subcategory}</td>
                  <td>{prod.tags?.join(', ')}</td>
                </tr>
              </tbody>
            </table>

            <h3 className="my-4">More Details</h3>
            <table className="table w-50">
              <thead>
                <tr>
                  <th scope="col">Weight ID</th>
                  <th scope="col">Weight</th>
                  <th scope="col">Weight Units</th>
                  <th scope="col">MRP</th>
                  <th scope="col">SP</th>
                  <th scope="col">Stock</th>
                </tr>
              </thead>
              <tbody>
                {prod.weights?.map((weight) => (
                  <tr key={weight.weight_id}>
                    <td>{weight.weight_id}</td>
                    <td>{weight.weight}</td>
                    <td>{weight.weight_units}</td>
                    <td>{weight.mrp}</td>
                    <td>{weight.sp}</td>
                    <td>{weight.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GetProduct;

