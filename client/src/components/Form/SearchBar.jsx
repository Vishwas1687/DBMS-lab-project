import React from 'react'
import '../styles/SearchBar.css'
import {BiSearch} from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai'
import { useState,useEffect } from 'react'
// import { useSearch } from '../../context/search'
import axios from 'axios'

const SearchBar = () => {
    // const [reply,setReply] = useSearch();

    const [input,setInput] = useState('');
    const [results,setResults] = useState([]);

    const handleSearch = async (e) =>{
        setInput(e.target.value);
        if (input == '') setResults([]);

        if (e.target.value.trim() !== ""){
            try{
                const {data} = await axios.get(`http://localhost:5000/api/products/get-products-by-search/${e.target.value}`);
                if (data.products) setResults(data.products);
                else setResults([]);
            }catch (error){
                console.log(error);
            }
        }
    }

    useEffect(() => {
      }, [results]);

  return (
    <div className='search'>
        <div className="searchInput">
            <input type="text" placeholder='Type to search...' value={input} onChange={handleSearch}/>
            <div className="searchIcon">
                {input ? <AiOutlineClose id="clearBtn" onClick={()=>{setInput("")}}/> :  <BiSearch />}
            </div>
        </div>
        <div className="results" style={input ? {display:'block'}: {display:'none'}}>
            { (results.length) ? 
                results.slice(0,10).map((product) => {
                    return <div className='resultItem hoverEffect' key={product._id}><span className='brand'>{product.brand.brand_name}</span><span className="productName">{product.product_name}</span></div>;
                  })
             : <div className='resultItem'><span className='brand'>No products found...</span></div>}
        </div>
    </div>
  )
}

export default SearchBar