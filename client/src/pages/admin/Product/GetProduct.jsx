import React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/AdminMenu";
import { useParams ,useNavigate} from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
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

const tableHeaderStyle = {
  backgroundColor: '#006400',
  color: '#fff',
  padding: '10px',
  textAlign: 'left',
  fontWeight: 'bold',
  border: '2px solid #111',
  fontFamily: 'Arial, sans-serif',
};

const tableCellStyle = {
  padding: '10px',
  borderBottom: '2px solid #000',
  borderRight: '2px solid #000',
  fontFamily: 'Arial, sans-serif',
  color:'black',
  fontWeight:'bold'
};

const viewButtonStyle = {
  backgroundColor: 'green',
  color: '#fff',
  border:'2px solid #000',
  padding: '8px 8px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontFamily: 'Arial, sans-serif',
};

const editButtonStyle = {
  backgroundColor: 'blue',
  color: '#fff',
  border:'2px solid #000',
  padding: '8px 8px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontFamily: 'Arial, sans-serif',
};

const deleteButtonStyle = {
  backgroundColor: 'red',
  color: '#fff',
  border:'2px solid #000',
  padding: '8px 8px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontFamily: 'Arial, sans-serif',
};

const noOrdersCellStyle = {
  padding: '10px',
  textAlign: 'center',
  fontStyle: 'italic',
  backgroundColor: '#f5f5f5',
  fontFamily: 'Arial, sans-serif',
};

const loadingCellStyle = {
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#f5f5f5',
  fontFamily: 'Arial, sans-serif',
};   


  return (
    <Layout title="DashBoard - Manage Category">
      <div className="container-fluid dashboard">
        <div className="row">
          <div className="col-md-3 p-5" style={{'margin-top':'2rem'}}>
            <AdminMenu />
          </div>
          <div className="col-md-9 p-5" style={{'margin-top':'2rem'}}>
            <h1 className="pb-3">{prod.product_name}</h1>
            <h2 className="mb-4">{`Product ID: ${prod.product_id}`}</h2>

            
            <table className="table">
              <thead>
                <tr>
                  <th style={tableHeaderStyle} scope="col">Seller ID</th>
                  <th style={tableHeaderStyle} scope="col">Brand</th>
                  <th style={tableHeaderStyle} scope="col">Category</th>
                  <th style={tableHeaderStyle} scope="col">Subcategory</th>
                  <th style={tableHeaderStyle} scope="col">Tags</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tableCellStyle}>{prod.seller_id}</td>
                  <td style={tableCellStyle}>{prod.brand?.brand_name}</td>
                  <td style={tableCellStyle}>{prod.category?.category_name}</td>
                  <td style={tableCellStyle}>{prod.subcategory}</td>
                  <td style={tableCellStyle}>{prod.tags?.join(', ')}</td>
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
            <button className="btn btn-primary ms-2"
            style={{'border':'2px solid #111','margin-bottom':'1rem'}}>Create Weight</button>
             </div>
           </>  
        </Link>
        </span>

            <table className="table w-75">
              <thead>
                <tr>
                  <th style={tableHeaderStyle} scope="col">Weight ID</th>
                  <th style={tableHeaderStyle} scope="col">Weight</th>
                  <th style={tableHeaderStyle} scope="col">Weight Units</th>
                  <th style={tableHeaderStyle} scope="col">MRP</th>
                  <th style={tableHeaderStyle} scope="col">SP</th>
                  <th style={tableHeaderStyle} scope="col">Stock</th>
                  <th style={tableHeaderStyle} scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {prod.weights?.map((weight,index) => (
                  <tr key={weight.weight_id} style={{backgroundColor:index%2==1?'#4CAF50':'#3CB371'}}>
                    <td style={tableCellStyle}>{weight.weight_id}</td>
                    <td style={tableCellStyle}>{weight.weight}</td>
                    <td style={tableCellStyle}>{weight.weight_units}</td>
                    <td style={tableCellStyle}>{weight.mrp}</td>
                    <td style={tableCellStyle}>{weight.sp}</td>
                    <td style={tableCellStyle}>{weight.stock}</td>
                    <td style={tableCellStyle}><button className="btn btn-primary ms-2" 
                    style={editButtonStyle}
                    onClick={()=>navigate(`/admin/update-weight/${prod.slug}/${weight.weight_id}`)}>
                        Edit
                    </button>
                    <button className="btn btn-danger ms-2" onClick={(e)=>handleDeleteWeight(weight.weight_id) 
                    } style={deleteButtonStyle}>
                        Delete
                    </button>
                    </td>
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
