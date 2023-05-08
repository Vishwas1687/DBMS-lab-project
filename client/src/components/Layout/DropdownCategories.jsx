import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast"
const DropdownCategories = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          <li key={category.category_id}>
            <Link to={`/category/${category.category_id}`} className="dropdown-item">
              {category.category_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownCategories;
