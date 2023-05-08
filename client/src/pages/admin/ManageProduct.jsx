import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/AdminMenu';
import { toast } from 'react-hot-toast';
import { Link,useNavigate } from 'react-router-dom';

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate=useNavigate()

   const getAllProducts=async()=>{
    try{
        const {data}=await axios.get('http://localhost:5000/api/products/all-products')
        setProducts(data.products)
        console.log(data)
    }
    catch(error)
    {
        toast.error(error)
    }
   }

  // Fetch products from backend on initial load
  useEffect(() => {
      getAllProducts()
    },[]);

  // Function to handle adding a new product
  const handleAddProduct = () => {
    // TODO: Implement adding a new product
  };

  const getAllProduct = async() => {

    try{

      const {data} = await axios.get("http://localhost:5000/api/products/all-products");
      if(data?.success){

        setProducts(data?.products)
      }
    }catch(error){

      console.log(error)
      toast.error("Something went wrong in getting category");
    }
  }

  useEffect(() => {
    getAllProduct();
  }, []);
  // Function to handle editing an existing product
  const handleEditProduct = (productId) => {
    // TODO: Implement editing an existing product
  };

  // Function to handle deleting an existing product
  const handleDeleteProduct = async (slug) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/products/delete-product/${slug}`
      );
      if (data.success) {
        toast.success(`product is deleted`);

        getAllProduct();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
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

            <button type="button" className="btn btn-primary" onClick={()=>navigate('/admin/create-product')}>
              Create Product
            </button>
            <br></br>
            <br></br>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="col-md-1">Image</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>          
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((c) => (
                    <>
                    <tr key={c.slug}>
                        <td>
                          <img
                        src={`http://localhost:5000/api/products/get-photo/${c.slug}`}
                        className="card-img-top"
                        alt={c.name}
                        height={"50px"}
                        />
                        </td>
                        <td>{c.product_id}</td>
                        <td>{c.product_name}</td>
                        <td><button className="btn btn-primary ms-2"
                         onClick={()=>navigate(`/admin/update-product/${c.slug}`)}>
                        Edit
                        </button>
                        <button className="btn btn-danger ms-2"
                        onClick={() => {
                        handleDeleteProduct(c.slug);
                        }}>

    

Delete
</button>
<Link to={`/admin/manage-product/product/${c.slug}`}>
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
    </>
  );
};

export default ManageProduct;
