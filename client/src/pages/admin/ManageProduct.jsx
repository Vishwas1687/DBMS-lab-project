import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/AdminMenu';

const ManageProduct = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from backend on initial load
  useEffect(() => {
    axios.get('/api/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  // Function to handle adding a new product
  const handleAddProduct = () => {
    // TODO: Implement adding a new product
  };

  // Function to handle editing an existing product
  const handleEditProduct = (productId) => {
    // TODO: Implement editing an existing product
  };

  // Function to handle deleting an existing product
  const handleDeleteProduct = (productId) => {
    // TODO: Implement deleting an existing product
  };

  return (
    <>
    <Layout title={"DashBoard - Manage Category"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Product</h1>
            <br></br>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>          
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                
</table>

                        </div>
                        
                    </div>
                </div>
            </div>
        </Layout>
    </>
  );
};

export default ManageProduct;
