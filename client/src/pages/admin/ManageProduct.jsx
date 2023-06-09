import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/AdminMenu';
import { toast } from 'react-hot-toast';
import { Link,useNavigate } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { Buffer } from 'buffer';
import {baseUrl} from '../../baseUrl'

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate=useNavigate()
  const [loading,setLoading]=useState(true)
  const [search__,setSearch__] = useState('');

   const getAllProducts=async()=>{
    try{
        setLoading(true)
        const {data}=await axios.get(`${baseUrl}/api/products/all-products`)
        setProducts(data.products)
        setLoading(false)
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


  // Function to handle deleting an existing product
  const handleDeleteProduct = async (slug) => {
    try {
      const { data } = await axios.delete(
        `${baseUrl}/api/products/delete-product/${slug}`
      );
      if (data.success) {
        toast.success(`product is deleted`);

        getAllProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
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
    <>
    <Layout title={"DashBoard - Manage Category"}>
      <div className="container-fluid dashboard">
        <div className="row">
          <div className="col-md-3" style={{'margin-top':'2rem'}}>
            <AdminMenu />
          </div>
          <div className="col-md-9" style={{'margin-top':'2rem'}}>
            <h1>Manage Product</h1>

            <button type="button"
            style={{'border':'2px solid #111'}} className="btn btn-primary" onClick={()=>navigate('/admin/create-product')}>
              Create Product
            </button>
            <br></br>
            <br></br>
            <div>
                  <input type='text' value={search__} onChange={e => {setSearch__(e.target.value)}} className='mb-5' placeholder="Search..." style={{border:'2px solid #656363',padding:'10px'}}/> 
                   {search__ ? <AiOutlineClose style={{'font-size':'2.9rem','border':'1px solid #111'}} id="clearBtn" onClick={()=>{setSearch__("")}}/> :  <BiSearch style={{'font-size':'2.9rem','border':'2px solid #111'}}/>}
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th style={{'border':'2px solid #111','width':'4rem',backgroundColor: '#006400',color:'white'}} scope="col">Image</th>
                    <th style={tableHeaderStyle} scope="col">ID</th>
                    <th style={tableHeaderStyle} scope="col">Name</th>          
                    <th style={tableHeaderStyle} scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading?products.filter((c)=>{
                    if (search__ === '') return c;
                    else if (c.product_name.toLowerCase().includes(search__.toLowerCase())){
                      return c;
                    }
                  }).map((c,index) => (
                    <>
                    <tr key={c.slug} style={{backgroundColor:index%2==1?'#4CAF50':'#3CB371'}}>
                      <td style={{'border':'2px solid #111'}}>
                      <img src={`${baseUrl}/api/products/get-photo/${c.slug}` } 
                      height={"50px"} object-fit="cover"/>
                      </td>
                        <td style={tableCellStyle}>{c.product_id}</td>
                        <td style={tableCellStyle}>{c.product_name}</td>
                        <td style={tableCellStyle}><button className="btn btn-primary ms-2"
                        style={editButtonStyle}
                         onClick={()=>navigate(`/admin/update-product/${c.slug}`)}>
                        Edit
                        </button>
                        <button className="btn btn-danger ms-2"
                        style={deleteButtonStyle}
                        onClick={() => {
                        handleDeleteProduct(c.slug);
                        }}>

    

Delete
</button>
<Link to={`/admin/manage-product/product/${c.slug}`}>
  <button className="btn btn-info ms-2" style={viewButtonStyle}>View</button>
</Link>
</td>

                    </tr>
                    </>
                  )): <tr>
          <td colspan='8' className='myLoad'style={{height:100+'px',background:'lightgray',animation:'flicker 1s infinite'}}><div style={{display:'flex',height:100+'%',alignItems:'center',justifyContent:'center'}}>Loading...</div></td>
          </tr>}
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
