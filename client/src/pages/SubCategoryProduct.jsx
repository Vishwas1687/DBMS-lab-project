import React,{useEffect,useState} from 'react'
import {useParams,Link} from 'react-router-dom'
import {Radio,Checkbox} from 'antd'
import {FaAngleLeft,FaAngleRight} from 'react-icons/fa'
import Card from '../components/Layout/Card.jsx'
import {prices} from './../components/prices.js'
import toast from 'react-hot-toast'
import axios from 'axios'
import { AiOutlineClose } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import Layout from '../components/Layout/Layout'

const SubCategoryProduct = () => {
   const [category,setCategory]=useState('')
   const perPage=9;
   const [totalProducts,setTotalProducts]=useState(null)
   const [loading,setLoading]=useState(true)
   const [priceFilters,setPriceFilters]=useState([0,100000])
   const [products,setProducts]=useState([])
   const [brands,setBrands]=useState([])
   const [brandFilters,setBrandFilters]=useState([])
   const [currentPage,setCurrentPage]=useState(1)
   const [brandSearch,setBrandSearch]=useState('')
    const [totalPages,setTotalPages]=useState(null)
   const params=useParams()
   const getCategory=async()=>{
    try{
      setLoading(true)
       const {data}=await axios.get(`http://localhost:5000/api/categories/get-category/${params.slug}`)
       if(data.success)
       {
          setCategory(data.category)
       }
       else{
        toast.error(data.message)
       }
       setLoading(false)
    }
    catch(error)
    {
       toast.error('Something went wrong')
    }
   }

   const getAllSubCategoryProducts=async()=>{
    try{
      setLoading(true)
       const {data}=await axios.get(`http://localhost:5000/api/products/get-products-by-subcategory-paginated/${params.slug}/${params.subcategory_id}`,{
        params:{
          perPage:perPage,
          currentPage:currentPage
        }
       })
       if(data.success)
       {
           setProducts(data.products)
       }
       else
       {
        toast.error(data.message)
       }
       setLoading(false)
    }catch(error)
    {
        toast.error('Something went wrong')
    }
   }


  const getFilterProducts=async()=>{
    try{
      setLoading(true)
      
       const {data}=await axios.get('http://localhost:5000/api/products/get-all-products-based-on-subcategory-filters',
       {
        params:{
         priceFilters:JSON.stringify(priceFilters),
         slug:params.slug,
         subcategory_id:params.subcategory_id,
         brandFilters:JSON.stringify(brandFilters)
        }
       })
       if(data.success)
       setProducts(data.products)
       setLoading(false)
    }
    catch(error)
    {
        toast.error('Something went wrong')
    }
  }

  const getAllBrands=async()=>{
    try{
      const {data}=await axios.get('http://localhost:5000/api/brands/get-all-brands')
      if(data.success)
      setBrands(data.brands)
    }catch(error)
    {

    }
  }

  const getTotalProducts=async()=>{
    try{
      
      const {data}=await axios.get(`http://localhost:5000/api/products/get-total-products-in-subcategory-page/${params.slug}/${params.subcategory_id}`)
      if(data.success)
      {
        setTotalProducts(data.count)
        
      }
      
    }catch(error)
    {
      toast.error('Something went wrong')
    }
   }

   const handleFilter = (value, id) => {
    let all = [...brandFilters];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setBrandFilters(all);
  };

   const handleForward=()=>{
       if(currentPage===totalPages)
       setCurrentPage(1)
       else
       setCurrentPage((page)=>page+1)
   }

   const handleBackward=()=>{
       if(currentPage===1)
       setCurrentPage(totalPages)
       else
       setCurrentPage((page)=>page-1)
   }

   useEffect(()=>{
    getCategory()
    getAllSubCategoryProducts()
    getAllBrands()
   },[params.slug,params.subcategory_id])

   useEffect(() => {
      getAllSubCategoryProducts()
    },[currentPage]);

   useEffect(()=>{
        getFilterProducts()
   },[priceFilters,brandFilters])

   useEffect(()=>{
      getTotalProducts()
    },[products])

    useEffect(()=>{
       setTotalPages(Math.ceil(totalProducts/perPage))
    },[totalProducts])

    // useEffect(()=>{
    //   console.log(totalProducts)
    // },[totalProducts])



  return (
    <Layout title={`Products by category ${params.slug}`}>
        <div className="row m-2">
            <div className="col-md-2 text-left p-3 bg-light">
                <h1>Filters</h1>
                {loading?<h3>Loading...</h3>:(
                <div className="cont">
                  <Link to={`/category/${category.slug}`}>
                    <h4 className="text-black">{category.category_name}</h4> 
                    </Link>
                    <div className="p-1">
                     
                       {category && category.subcategories.map((subcat,index)=>(
                       <div key={index}>
                        <Link to={`/subcategory/${category.slug}/${subcat.subcategory_id}`} className="text-decoration-none">
                          {subcat.subcategory_id===parseInt(params.subcategory_id)?
                          (<p className="text-primary">{subcat.subcategory_name}</p>)
                           :(<p className="text-secondary">{subcat.subcategory_name}</p>)}
                        </Link>
                        </div>
                       ))}
                    </div>
                </div>
                )} 

                <h3>Brand Filters</h3>
                <div className='search'>
                 <div className='searchInput mb-3' style={{'border':'1px solid #111'}}>
                 <input type="text" value={brandSearch}
                 placeholder="Enter the brand" onChange={(e)=>setBrandSearch(e.target.value)}/>
                 
                  <div className="searchIcon">
                {brandSearch ? <AiOutlineClose id="clearBtn" onClick={()=>{setBrandSearch("")}}/> :  <BiSearch />}
                 </div>
                 </div>
                 </div>
                 <div className="cont" style={{height:'200px',overflow:'auto','background-color':'#fff'}}>
                  
                   {brands?.filter((c)=>{
                    if (brandSearch === '') return c;
                    else if (c.brand_name.toLowerCase().includes(brandSearch.toLowerCase())){
                      return c;
                    }
                  })
                   ?.map((c) => (
                    <li style={{"list-style-type":"none",display:'flex','align-items':'center'}}>
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked,c._id)}
              >
                <span style={{'font-size':'1.3rem',}}>
                {c.brand_name}
                </span>
              </Checkbox>
                 </li>  
            ))   
            }
            
         
                 </div>
 

                <br></br>
                <div className="cont">
                  <h3>Price Filters</h3>
                  <Radio.Group>
                   {prices.map((price,index)=>(
                    <div key={index}>
                      <Radio key={index} value={price.array} onChange={(e)=>setPriceFilters(e.target.value)}
                      > <span className="h5 text-black">{price.name}</span>
                      </Radio>
                    </div>
                   ))}
                   </Radio.Group>
                   <br></br>
                   <br></br>
                   <button type="button" className="btn btn-success" onClick={()=>{
                  window.location.href = window.location.pathname;
                }}>
                      Reset Filters
                </button>
                </div>
            </div>

            <div className="col-md-10 text-left">
           
                <h1>Products</h1>  
                <div className="row no-gutters">
                 {!loading && products.length!==0 && products.map((product,index)=>(
                       <>
                          <div className="col-md-4">
                            <Card {...product}/>
                          </div>
                       </>
                 ))
                  }
                  </div>
                  
                   {!loading?(
                  <>
                  <div className="pagination-container" style={{textAlign:"center"}}>
        <button type="button" className="btn btn-success"
        onClick={handleBackward}>
            <span style={{textAlign:"center",alignItems:"center"}}><FaAngleLeft/></span>
        </button>
         
           
            {Array.from(Array(totalPages), (_, index) => (
            <button
            key={index}
            type="button"
            className={`btn ${index + 1 === currentPage ? 'btn-primary' : 'btn-secondary'}`}
            style={{ margin: '3px' }}
            onClick={() => setCurrentPage(index + 1)}
             >
              {index + 1}
            </button>
            ))}

         <button type="button" className="btn btn-success"
         onClick={handleForward}>
          <span style={{textAlign:"center",alignItems:"center"}}><FaAngleRight/></span>
         </button>
      </div>
      </>):''}

                  

                  
            </div>
        </div>
    </Layout>
  )
}

export default SubCategoryProduct