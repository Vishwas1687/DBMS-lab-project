import React from 'react'
import '../styles/SearchBar.css'
import {BiSearch} from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react'
// import { useSearch } from '../../context/search'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {baseUrl} from '../../baseUrl'

const SearchBar = () => {
    // const [reply,setReply] = useSearch();

    const [input,setInput] = useState('');
    const [results,setResults] = useState([]);
    const [searchTimeout,setSearchTimeout]=useState(null)

    const handleSearch = async (e) => {
  setInput(e.target.value);
  if (input === '') setResults([]);
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  if (e.target.value.trim() !== '') {

    setSearchTimeout(setTimeout(async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/products/get-products-by-search/${e.target.value}`);
        if (data.products) {
          setResults(data.products);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.log(error);
      }
    }, 1000));
  }
};

  return (
    <div className='search'>
        <div className="searchInput">
            <input type="text" placeholder='Enter the product....' value={input} onChange={handleSearch}
            style={{
             outline: 'none',
             border: '3px solid #111',
             color:'black',
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