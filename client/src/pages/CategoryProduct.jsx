import React,{useEffect,useState} from 'react'
import {useParams,Link,useLocation} from 'react-router-dom'
import {Checkbox,Radio} from 'antd'
import {FaAngleLeft,FaAngleRight} from 'react-icons/fa'
import Card from '../components/Layout/Card.jsx'
import {prices} from './../components/prices.js'
import toast from 'react-hot-toast'
import axios from 'axios'
import '../components/styles/SearchBar.css'
import Layout from '../components/Layout/Layout'
import { CaretDown,CaretUp } from 'phosphor-react'
import {AiOutlineClose} from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import '../components/styles/ProductPage.css'
import './styles/CategoryProduct.css'
import {baseUrl} from '../baseUrl.js'


const CategoryProduct = () => {
   const [category,setCategory]=useState('')
   const [loading,setLoading]=useState(true)
   const [productLoading,setProductLoading]=useState(true)
   const [totalProducts,setTotalProducts]=useState(null)
   const location=useLocation()
   const perPage=9;
   const [brands,setBrands]=useState([])
   const [brandFilters,setBrandFilters]=useState([])
   const [priceFilters,setPriceFilters]=useState([0,100000])
   const [subcategoryFilters,setSubCategoryFilters]=useState([])
   const [products,setProducts]=useState([])
   const [currentPage,setCurrentPage]=useState(1)
    const [totalPages,setTotalPages]=useState(null)
   const [brandSearch,setBrandSearch]=useState('') 
   const [subcategorySearch,setSubCategorySearch]=useState('')
    
   const params=useParams()
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

   const getAllCategoryProducts=async()=>{
    try{
      setLoading(true)
       const {data}=await axios.get(`${baseUrl}/api/products/get-products-by-category-paginated/${params.slug}`,{
        params:{
          perPage:perPage,
          currentPage:currentPage
        }
       })
      //  console.log(data)
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

    const getAllBrands=async()=>{
    try{

      const {data}=await axios.get(`${baseUrl}/api/brands/get-all-brands-by-cat/${params.slug}`)
      if(data.success)
      setBrands(data.brands)

    }catch(error)
    {

    }
  }

  const getFilterProducts=async()=>{
    try{
      setLoading(true)
       const {data}=await axios.get(`${baseUrl}/api/products/get-all-products-based-on-category-filters`,
       {
        params:{
         priceFilters:JSON.stringify(priceFilters),
         slug:params.slug,
         subcategoryFilters:JSON.stringify(subcategoryFilters),
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

  const getTotalProducts=async()=>{
    try{
      const {data}=await axios.get(`${baseUrl}/api/products/get-total-products-in-category-page/${params.slug}`)
      if(data.success)
      {
        setTotalProducts(data.count)
      }
    }catch(error)
    {
      toast.error('Something went wrong')
    }
   }


   const handleFilterBrand = (value, id) => {
    let all = [...brandFilters];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setBrandFilters(all);
  };

  const handleFilterSubCategory = (value, subcategory_name) => {
    let allSubcat = [...subcategoryFilters];
    if (value) {
      allSubcat.push(subcategory_name);
    } else {
      allSubcat = allSubcat.filter((c) => c!== subcategory_name);
    }
    setSubCategoryFilters(allSubcat);
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
    setProductLoading(true)
    setProducts([])
    getCategory()
    getAllCategoryProducts()
    getAllBrands()
    setProductLoading(false)
   },[params.slug])

   useEffect(() => {
      // getAllCategoryProducts()
      getFilterProducts()
    },[currentPage]);

   useEffect(()=>{
    setCurrentPage(1)
        getFilterProducts()
   },[priceFilters,brandFilters,subcategoryFilters])

//  useEffect(()=>{
//       getTotalProducts()
//     },[products])

    useEffect(()=>{
       setTotalPages(Math.ceil(totalProducts/perPage))
    },[totalProducts])

    // useEffect(()=>{
    //   console.log(totalPages)
    // },[totalPages])

  return (
    <Layout title={`Products by ${params.slug}`}>
        <div className="row m-2" style={{'overflow-x':'hidden','background-color':'white'}}>
            <div className="col-md-2 text-left p-3" style={{'background-color':'#444444'}}>
                <h1 style={{'color':'white','border-bottom':'1px solid #fff'}}>Filters</h1>
                {loading?<h3 style={{'color':'white'}}>Loading...</h3>:(
                <div className="cont" style={{'border-bottom':'1px solid #fff'}}>
                    <h4 style={{'color':'white','border-bottom':'1px solid #fff'}}>{category.category_name}</h4> 
                    <div className=" p-1">
                       {category && category.subcategories.map((subcat,index)=>(
                       <div key={index} className="subcategories-CategoryPage">
                        <Link to={`/subcategory/${category.slug}/${subcat.subcategory_id}`}  >
                            <p style={{'color':'white'}} >{subcat.subcategory_name}</p>
                        </Link>
                        </div>
                       ))}
                    </div>
                </div>
                )} 
                 <h3 style={{'color':'white','margin-top':'1rem','border-bottom':'1px solid white'}}>BrandFilters</h3>
                 <div className='search'>
                 <div className='searchInput mb-3 mr-2' style={{'border':'1px solid #111'}}>
                 <input type="text" value={brandSearch} style={{'width':'11rem','font-size':'1rem'}}
                 placeholder="Enter the brand" onChange={(e)=>setBrandSearch(e.target.value)}/>
                 
                  <div className="searchIcon" style={{'width':'2.5rem'}}>
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
                onChange={(e) => handleFilterBrand(e.target.checked,c._id)}
              >
                <span style={{'font-size':'1.3rem'}}>
                {c.brand_name}
                </span>
              </Checkbox>
                 </li>  
            ))   
            }
            
         
                 </div>
                   <br></br>
                   <h3 style={{'color':'white','margin-top':'1rem','border-bottom':'1px solid white'}}>SubCategoryFilters</h3>
                   <div className='search'>
                 <div className='searchInput mb-3' style={{'border':'1px solid #111'}}>
                 <input type="text" value={subcategorySearch} style={{'width':'11rem','font-size':'0.9rem'}}
                 placeholder="Enter the subcategory" onChange={(e)=>setSubCategorySearch(e.target.value)}/>
                 
                  <div className="searchIcon">
                {subcategorySearch ? <AiOutlineClose id="clearBtn" onClick={()=>{setSubCategorySearch("")}}/> :  <BiSearch />}
                 </div>
                 </div>
                 </div>
                  <div className="cont" style={{'padding-left':'1rem',height:'150px',overflow:'auto','background-color':'#fff'}}>
                  
                   {category.subcategories?.
                   filter((c)=>{
                    if (subcategorySearch === '') return c;
                    else if (c.subcategory_name.toLowerCase().includes(subcategorySearch.toLowerCase())){
                      return c;
                    }
                  })
                   ?.map((subcat) => (
                    <li style={{"list-style-type":"none",display:'flex','align-items':'center'}}>
              <Checkbox
                key={subcat._id}
                onChange={(e) => handleFilterSubCategory(e.target.checked,subcat.subcategory_name)}
              > <span style={{'font-size':'1.3rem'}}>
                {subcat.subcategory_name}
                </span>
              </Checkbox>
              </li>
            ))}

                 </div>

                <br></br>

                
                <div className="cont">
                  <h3 style={{'color':'white','border-bottom':'1px solid white'}}>Price Filters</h3>
                  <Radio.Group>
                     <Radio value={null} onChange={(e)=>setPriceFilters([0,100000])}>
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
                </div>
                <br></br>
            </div>

            <div className="col-md-10 text-left">
           
                <h1>Products</h1>  
                <div className="row no-gutters">
                 {!loading && products.length!==0 &&products.map((product,index)=>(
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
                  
                 {!loading && products.length !==0 ?(
                  <>
                  <div className="pagination-container" style={{textAlign:"center"}}>
        <button type="button" className="btn btn-success" onClick={()=>{
          handleBackward();window.scrollTo({top:0,behavior:'smooth'})}}>
        
            <span style={{textAlign:"center",alignItems:"center",'font-weight':'bold'}}><FaAngleLeft/> Previous</span>
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

         <button type="button" className="btn btn-success" onClick={()=>{
          handleForward();window.scrollTo({top:0,behavior:'smooth'})}}>
         
          <span style={{textAlign:"center",alignItems:"center",'font-weight':'bold'}}>Next <FaAngleRight/> </span>
         </button>
      </div>
      </>):(productLoading && products.length===0)?(<div>
            <h1 style={{'margin-left':'45%'}}> Loading ... </h1>
          <div className="loader">
          <div className="loader-inner">
          </div>
           </div>
           </div>):(
             <h1>No Products Found if shown for more than 5 seconds...</h1>
           )}   

      <br></br>
       <br></br>
        
                  

                  
            </div>
        </div>
    </Layout>
  )
}

export default CategoryProduct