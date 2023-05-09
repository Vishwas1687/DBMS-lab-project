import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast"
const DropdownCategories = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleMouseEnter = async (category) => {
    setHoveredCategory(category);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/categories/get-subcategories/${category.category_id}`
      );
      if (data?.success) {
        setHoveredCategory((prevState) => ({
          ...prevState,
          subcategories: data.subcategories,
        }));
      }
    } catch (error) {
      console.log(error);
    //   toast.error("Something went wrong in getting subcategories");
    }
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const [categories, setCategories] = useState([]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/categories/get-all-categories"
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
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <Link
        className="nav-link dropdown-toggle"
        to="#"
        id="navbarDropdownMenuLink"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
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
          >
            <Link
              to={`/category/${category.category_id}`}
              className="dropdown-item"
            >
              {category.category_name}
            </Link>
            {hoveredCategory && hoveredCategory.category_id === category.category_id && (
              <ul>
                {hoveredCategory.subcategories.map((subcategory) => (
                  <li key={subcategory.subcategory_id}>
                    <Link
                      to={`/subcategory/${subcategory.subcategory_id}`}
                      className="dropdown-item"
                    >
                      {subcategory.subcategory_name}
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
