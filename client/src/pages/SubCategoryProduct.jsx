import React,{useEffect,useState,useRef} from 'react'
import {useParams,Link} from 'react-router-dom'
import {Radio,Checkbox} from 'antd'
import {FaAngleLeft,FaAngleRight} from 'react-icons/fa'
import Card from '../components/Layout/Card.jsx'
import {prices} from './../components/prices.js'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from './../context/auth';
import { AiOutlineClose } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import Layout from '../components/Layout/Layout'
import '../components/styles/ProductPage.css'
import './styles/CategoryProduct.css'
import {baseUrl} from '../baseUrl.js'


const SubCategoryProduct = () => {
   const [category,setCategory]=useState('')
   const perPage=6;
   const [auth,setAuth]=useAuth()
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
   const refRadio=useRef()
   const getCategory=async()=>{
    try{
      setLoading(true)
       const {data}=await axios.get(`${baseUrl}/api/categories/get-category/${params.slug}`)
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
       const {data}=await axios.get(`${baseUrl}/api/products/get-products-by-subcategory-paginated/${params.slug}/${params.subcategory_id}`,{
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
      
       const {data}=await axios.get(`${baseUrl}/api/products/get-all-products-based-on-subcategory-filters`,
       {
        params:{
         priceFilters:JSON.stringify(priceFilters),
         slug:params.slug,
         subcategory_id:params.subcategory_id,
         brandFilters:JSON.stringify(brandFilters),
         perPage:perPage,
         currentPage:currentPage
        }
       })
       if(data.success)
       {
           setProducts(data.products)
           setTotalProducts(data.productLength)
       }
       
       setLoading(false)
    }
    catch(error)
    {
        toast.error('Something went wrong')
    }
  }

  const getAllBrands=async()=>{
    try{
      setLoading(true)
      const {data}=await axios.get(`${baseUrl}/api/brands/get-all-brands-by-subcat/${params.slug}/${params.subcategory_id}`)
      if(data.success)
      setBrands(data.brands)
      else
      toast.error(data.message)
      setLoading(false)
    }catch(error)
    {
       toast.error('Something went wrong')
    }
  }

  const getTotalProducts=async()=>{
    try{
      setLoading(true)
      const {data}=await axios.get(`${baseUrl}/api/products/get-total-products-in-subcategory-page/${params.slug}/${params.subcategory_id}`)
      if(data.success)
      {
        setTotalProducts(data.count)
      }
      setLoading(false)
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
    setProducts([])
    setPriceFilters([0,100000])
    setBrandFilters([])
    getCategory()
    getAllSubCategoryProducts()
    getAllBrands()
   },[params.slug,params.subcategory_id])

   useEffect(() => {
      // getAllSubCategoryProducts()
      getFilterProducts()
    },[currentPage]);

   useEffect(()=>{
        setCurrentPage(1)
        getFilterProducts()
   },[priceFilters,brandFilters])

  //  useEffect(()=>{
  //     getTotalProducts()
  //   },[products])

    useEffect(()=>{
       setTotalPages(Math.ceil(totalProducts/perPage))
    },[totalProducts])




  return (
    <Layout title={`Products by category ${params.slug}`}>
        <div className="row m-2" style={{'overflow-x':'hidden','background-color':'white'}}>
            <div className="col-md-2 text-left p-3" style={{'background-color':'#444444'}}>
                <h1 style={{'color':'white','border-bottom':'1px solid #fff'}}>Filters</h1>
                {loading?<h3>Loading...</h3>:(
                <div className="cont">
                  <Link to={`/category/${category.slug}`}>
                    <h4 style={{'color':'white','border-bottom':'1px solid #fff'}}>
                      {category.category_name}</h4> 
                    </Link>
                    <div className="p-1">
                     
                       {category && category.subcategories.map((subcat,index)=>(
                       <div key={index} className="subcategories-CategoryPage">
                        <Link to={`/subcategory/${category.slug}/${subcat.subcategory_id}`} className="text-decoration-none">
                          {subcat.subcategory_id===parseInt(params.subcategory_id)?
                          (<p className="text-primary">{subcat.subcategory_name}</p>)
                           :(<p className="text-white">{subcat.subcategory_name}</p>)}
                        </Link>
                        </div>
                       ))}
                    </div>
                </div>
                )} 

                <h3 style={{'color':'white','margin-top':'1rem','border-bottom':'1px solid white'}}>Brand Filters</h3>
                <div className='search'>
                 <div className='searchInput mb-3' style={{'border':'1px solid #111'}}>
                 <input type="text" value={brandSearch} style={{'width':'11rem','font-size':'1rem'}}
                 placeholder="Enter the brand" onChange={(e)=>setBrandSearch(e.target.value)}/>
                 
                  <div className="searchIcon">
                {brandSearch ? <AiOutlineClose id="clearBtn" onClick={()=>{setBrandSearch("")}}/> :  <BiSearch />}
                 </div>
                 </div>
                 </div>
                 <div className="cont" style={{'padding-left':'1rem',height:'200px',overflow:'auto','background-color':'#fff'}}>
                  
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
                  <h3 style={{'color':'white','margin-top':'1rem','border-bottom':'1px solid white'}}>Price Filters</h3>
                  <Radio.Group>
                     <Radio value={null} onChange={(e)=>setPriceFilters([0,100000])} ref={refRadio}>
                    <span className="h5 text-white">No Filter</span>
                     </Radio>
                   {prices.map((price,index)=>(
                    <div key={index}>
                      <Radio key={index} value={price.array} onChange={(e)=>setPriceFilters(e.target.value)}
                      > <span className="h5 text-white">{price.name}</span>
                      </Radio>
                    </div>
                   ))}
                   </Radio.Group>
                   <br></br>
                   <br></br>
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

                  <br></br>
                  <br></br>
                  
                   {!loading && products.length !== 0 ?(
                  <>
                  <div className="pagination-container" style={{textAlign:"center"}}>
        <button type="button" className="btn btn-success" onClick={()=>{
          handleBackward();window.scrollTo({top:0,behavior:'smooth'})}}>
        
            <span style={{textAlign:"center",alignItems:"center",'font-weight':'bold'}}><FaAngleLeft/>Previous</span>
        </button>
         
           
            {Array.from(Array(totalPages), (_, index) => (
            <button
            key={index}
            type="button"
            className={`btn ${index + 1 === currentPage ? 'btn-primary' : 'btn-secondary'}`}
            style={{ margin: '3px' }}
            onClick={() => {setCurrentPage(index + 1);
                window.scrollTo({top:0,behavior:'smooth'})}}
             >
              {index + 1}
            </button>
            ))}

         <button type="button" className="btn btn-success"  onClick={()=>{
          handleForward();window.scrollTo({top:0,behavior:'smooth'})}}>
          <span style={{textAlign:"center",alignItems:"center",'font-weight':'bold'}}>Next <FaAngleRight/></span>
         </button>
      </div>
      </>):(loading && products.length===0)?(<div>
            <h1 style={{'margin-left':'45%'}}> Loading ... </h1>
          <div className="loader">
          <div className="loader-inner">
          </div>
           </div>
           </div>):(
             <h1>No Products Found if shown for more than 5 seconds...</h1>
           )}   
            </div>
        </div>
        <br></br>
    </Layout>
  )
}

export default SubCategoryProduct