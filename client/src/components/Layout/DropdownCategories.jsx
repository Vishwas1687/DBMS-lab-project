import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast"
import '../styles/DropdownCat.css'
import {baseUrl} from '../../baseUrl'
const DropdownCategories = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hover,setHover]=useState(false)
  const handleMouseEnter = async (category) => {
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const [categories, setCategories] = useState([]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/categories/get-all-categories`
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div
      className="nav-item dropdown"
      onMouseEnter={() => {setIsDropdownOpen(true);setHover(true)}}
      onMouseLeave={() => {setIsDropdownOpen(false);setHover(false)}}
    >
      <Link
        className="nav-link dropdown-toggle"
        to="#"
        id="navbarDropdownMenuLink"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{'border':'2px solid #111','padding':'0.5rem', 'font-size':'1.1rem',
        'font-weight':'bold','color':'#111', 
         }}
        >
        Categories
      </Link>
      <ul
        className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
        aria-labelledby="navbarDropdownMenuLink"
      >
        {categories.map((category) => (
          <li
            key={category.category_id}
            onMouseEnter={() => handleMouseEnter(category)}
            onMouseLeave={() => handleMouseLeave()}
            className="dropdown-navbar"
            style={{'background-color':'#111'}}
          >
            <Link
              to={`/category/${category.slug}`}
              className="dropdown-item text-decoration-none"
              onClick={()=>setIsDropdownOpen(false)}
            >
              <p className="dropdown-cat">{category.category_name}</p>
            </Link>
            {hoveredCategory && hoveredCategory.category_id === category.category_id && (
              <ul style={{'margin-top':'0rem'}}>
                {hoveredCategory.subcategories.map((subcategory) => (
                  <li key={subcategory.subcategory_id}>
                    <Link
                      to={`/subcategory/${category.slug}/${subcategory.subcategory_id}`}
                      className="dropdown-item text-decoration-none"
                      onClick={()=>setIsDropdownOpen(false)}
                    >
                      <p>{subcategory.subcategory_name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownCategories;
