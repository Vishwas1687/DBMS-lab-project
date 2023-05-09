import React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/AdminMenu";
import { useParams ,useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";


const GetProduct = () => {
  const [prod, setProd] = useState({});
  const navigate=useNavigate()
  const params = useParams();

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

  useEffect(() => {
    getProduct();
  }, [params.slug]);


  const handleDeleteWeight = async (weight_id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/products/get-single-product/${params.slug}/${weight_id}/delete`
      );
      if (data?.success) {
        toast.success(data.message);
        getProduct()
      } else {
        toast.error(data?.message || "Failed to delete weight.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };


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

            <div className="text-left">
                 <img src={`http://localhost:5000/api/products/get-photo/${params.slug}`}
                  className="img img-responsive"
                    alt="photo"
                  height={"300px"}/>
                  
            </div> 

            <h2 className="my-4">Weights</h2>
        <span>
        <Link to = {`/admin/get-product/create-weight/${prod.slug}`}>
             <>
            <div className="text-left">
            <button className="btn btn-primary ms-2">Create Weight</button>
             </div>
           </>  
        </Link>
        </span>

            <table className="table w-75">
              <thead>
                <tr>
                  <th scope="col">Weight ID</th>
                  <th scope="col">Weight</th>
                  <th scope="col">Weight Units</th>
                  <th scope="col">MRP</th>
                  <th scope="col">SP</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Actions</th>
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
                    <td><button className="btn btn-primary ms-2" 
                    onClick={()=>navigate(`/admin/update-weight/${prod.slug}/${weight.weight_id}`)}>
                        Edit
                    </button>
                    <button className="btn btn-danger ms-2" onClick={(e)=>handleDeleteWeight(weight.weight_id)
                    }>
                        Delete
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <Link to = {`/admin/get-product/create-weight/${prod.slug}`}>
        <>
        <div className="container-fluid m-3 p-3 dashboard">
         <div style={{position: 'fixed', bottom: '50px', right: '50px'}}>
          <button className="btn btn-primary ms-2">Create Weight</button>
         </div>
         </div>
           </>  
        </Link> */}

        </div>
        
    </Layout>
  );
};

export default GetProduct;
