import React from 'react'
import '../styles/SearchBar.css'
import {BiSearch} from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react'
// import { useSearch } from '../../context/search'
import axios from 'axios'
import { Link } from 'react-router-dom'

const SearchBar = () => {
    // const [reply,setReply] = useSearch();

    const [input,setInput] = useState('');
    const [results,setResults] = useState([]);

    const handleSearch = async (e) =>{
        setInput(e.target.value);
        if (input === '') setResults([]);

        if (e.target.value.trim() !== ""){
            try{
                const {data} = await axios.get(`http://localhost:5000/api/products/get-products-by-search/${e.target.value}`)
                if (data.products) 
                {
                    setResults(data.products);
                } 
                else 
                {
                    setResults([]);
                }
                
            }catch (error){
                console.log(error);
            }
        }
    }

  return (
    <div className='search'>
        <div className="searchInput">
            <input type="text" placeholder='Enter the product....' value={input} onChange={handleSearch}
            style={{
             outline: 'none',
             border: '3px solid #111',
             color:'black',
             'box-shadow':'2px 2px 2px 2px rgba(0,252,252,0.4)'
              }}  />
            <div className="searchIcon" style={{'border':'2px solid #111'}}>
                {input ? <AiOutlineClose style={{'color':'black'}} id="clearBtn" onClick={()=>{setInput("")}}/> :  <BiSearch style={{'color':'black'}}/>}
            </div>
        </div>
        <div className="results" style={input ? {display:'block',zIndex:1}: {display:'none'}}>
            { (results.length) ? 
                results.slice(0,10).map((product,index) => (
                        <Link to={`/product/${product.slug}`} key={index} className='resultItem' onClick={()=>{setInput('')}} 
                        >
                            <span className="productName" style={{padding:"2px"}}>{product.product_name}</span>
                        </Link>
                ))
             : (<div className='resultItem'>
                <span className='brand'>No products found...</span>
                </div>)}
        </div>
    </div>
  )
}

export default SearchBar