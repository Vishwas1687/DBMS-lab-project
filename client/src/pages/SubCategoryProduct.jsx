import React,{useEffect,useState} from 'react'
import {useParams,Link} from 'react-router-dom'
import {Radio} from 'antd'
import {prices} from './../components/prices.js'
import toast from 'react-hot-toast'
import axios from 'axios'
import Layout from '../components/Layout/Layout'

const SubCategoryProduct = () => {
   const [category,setCategory]=useState('')
   const [loading,setLoading]=useState(true)
   const [priceFilters,setPriceFilters]=useState([0,100000])
   const [products,setProducts]=useState([])
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

   const getAllCategoryProducts=async()=>{
    try{
      setLoading(true)
       const {data}=await axios.get(`http://localhost:5000/api/products/get-products-by-category/${params.slug}`)
       if(data.success)
       {
           setProducts(data.products)
           toast.success(data.message)
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
       const {data}=await axios.get('http://localhost:5000/api/products/get-all-products-based-on-filters',
       {
        params:{
         priceFilters:JSON.stringify(priceFilters)
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

   useEffect(()=>{
    getCategory()
    getAllCategoryProducts()
   },[])


   useEffect(()=>{
        getFilterProducts()
   },[priceFilters])

  return (
    <Layout title={'Products by category'}>
        <div className="row m-2">
            <div className="col-md-3 text-left p-3 bg-light">
                <h1>Filters</h1>
                {loading?<h3>Loading...</h3>:(
                <div className="cont">
                  <Link to={`/category/${params.slug}`}  className="text-decoration-none">
                    <h4 className="text-black">{category.category_name}</h4>
                   </Link> 
                    <div className="p-2">
                       {category && category.subcategories.map((subcat,index)=>(
                       <div key={index}>
                        <Link to={`/subcategory/${category.slug}/${subcat.subcategory_id}`} className="text-decoration-none text-secondary">
                            {subcat.subcategory_id===parseInt(params.subcategory_id)?
                            <p className="text-primary">{subcat.subcategory_name}</p>:
                            <p>{subcat.subcategory_name}</p>}
                        </Link>
                        </div>
                       ))}
                    </div>
                </div>
                )}
                
                <div className="cont">
                  <h3>Price Filters</h3>
                  <Radio.Group>
                   {prices.map((price,index)=>(
                    <div key={index}>
                      <Radio key={index} value={price.array} onChange={(e)=>setPriceFilters(e.target.value)}
                      > <span className="h6 text-black">{price.name}</span>
                      </Radio>
                    </div>
                   ))}
                   </Radio.Group>
                </div>
                


            </div>
              <div className="col-md-9 text-left p-3">
                {loading?<h1>Loading...</h1>:(
                  <h1>
                    Products
                  </h1>
            )}
            </div>
            
            
        </div>
    </Layout>
  )
}

export default SubCategoryProduct