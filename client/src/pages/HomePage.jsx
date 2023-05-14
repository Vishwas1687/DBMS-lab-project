import React,{useState,useEffect} from 'react'
import Header from '../components/Layout/Header'
import {useAuth} from '../context/auth'
import {FaAngleLeft,FaAngleRight} from 'react-icons/fa'
import Card from '../components/Layout/Card';
import Slider from "react-slick";
import axios from 'axios'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [totalProducts,setTotalProducts]=useState(null)
    const perPage=3;
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPages,setTotalPages]=useState(null)
  const navigate=useNavigate()

   const getPaginatedProducts=async()=>{
    try{
        const {data}=await axios.get('http://localhost:5000/api/products/get-paginated-products-for-homepage',{
          params:{
            perPage:perPage,
            page:currentPage
          }
        })
        setProducts(data.products)
        
    }
    catch(error)
    {
        toast.error(error)
    }
   }
   const getTotalProducts=async()=>{
    try{
      const {data}=await axios.get('http://localhost:5000/api/products/get-total-products-in-homepage')
      if(data.success)
      {
        setTotalProducts(data.count)
        setTotalPages(Math.ceil(totalProducts/perPage))
      }
    }catch(error)
    {
      toast.error('Something went wrong')
    }
   }

   const handleForward=()=>{
       if(currentPage==totalPages)
       setCurrentPage(1)
       else
       setCurrentPage((page)=>page+1)
   }

   const handleBackward=()=>{
       if(currentPage==1)
       setCurrentPage(totalPages)
       else
       setCurrentPage((page)=>page-1)
   }

   

  // Fetch products from backend on initial load
  useEffect(() => {
      getPaginatedProducts()
    },[currentPage]);

    useEffect(()=>{
      getTotalProducts()
    },[])
   


  return (
    <div>
      <Header />
      {/* <img src="https://img.freepik.com/free-photo/variety-fresh-tasty-vegetables-dark_1220-4444.jpg?w=1380&t=st=1683574655~exp=1683575255~hmac=e13185e4cd9e60dfcc0c6e46b4eddc1eee912cd5659588fbc4f1ce0255d827f5" alt="Example image" style={{ width: "100vw", height: "60vh" }} /> */}

    <Slider autoplay={true} autoplaySpeed={3000}>
  <div>
    <img src="https://img.freepik.com/free-photo/variety-fresh-tasty-vegetables-dark_1220-4444.jpg?w=1380&t=st=1683574655~exp=1683575255~hmac=e13185e4cd9e60dfcc0c6e46b4eddc1eee912cd5659588fbc4f1ce0255d827f5" alt="Example image" style={{ width: "100vw", height: "60vh" }} />
  </div>
  <div>
    <img src="https://img.freepik.com/free-photo/high-angle-indian-spices-arrangement_23-2148747644.jpg?w=1060&t=st=1683575187~exp=1683575787~hmac=0048f64b9f242a390cd00a7c15421e8535f73a67760a9c9d519cc83af749cf9c" alt="Example image" style={{ width: "100vw", height: "60vh" }} />
  </div>
  <div>
    <img src="https://img.freepik.com/free-photo/top-view-assortment-make-up-beauty-products_23-2148620013.jpg?w=1060&t=st=1683575257~exp=1683575857~hmac=24b76301ca16d225b963cf75cb9212b491d2a932f0c67539cce9f771bc39353a" alt="Example image" style={{ width: "100vw", height: "60vh" }} />
  </div>
  {/* <div>
    <img src="https://img.freepik.com/free-photo/pillow-bed_74190-6104.jpg?w=1060&t=st=1683575403~exp=1683576003~hmac=845d48a31f1bd0f78f863e34f3e7cb4c845c332343a0a916afd5af591d4e3488" alt="Example image" style={{ width: "100vw", height: "60vh" }} />
  </div> */}
</Slider>
        <div className='cards-list'>
           {products.map(item =>(
           
           <Card 
          key={item.product_id}
          {...item}
        />
       ))}
      </div>

       <br></br>
       <br></br>
       <br></br>
      <div className="pagination-container" style={{textAlign:"center"}}>
        <button type="button" className="btn btn-success"
        onClick={handleBackward}>
            <span style={{textAlign:"center",alignItems:"center"}}><FaAngleLeft/></span>
        </button>
         {
          products.map((_,index)=>{
            return (
            <>
            {index < totalPages && (
              
            <button type="button" className={`btn ${index+1===currentPage?'btn-primary':'btn-secondary'}`} style={{margin:"3px"}}
            onClick={()=>setCurrentPage(index+1)}>
              {index+1}
            </button>
            )}
            </>
            )
            })
         }
         <button type="button" className="btn btn-success"
         onClick={handleForward}>
          <span style={{textAlign:"center",alignItems:"center"}}><FaAngleRight/></span>
         </button>
      </div>
      <br></br>
      <br></br>
      
      

    </div>
  )
}

export default HomePage

