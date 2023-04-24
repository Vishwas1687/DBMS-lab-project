import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart,ShoppingBagOpen,User } from "phosphor-react";
import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      
      
      <div className="links">
        <Link to="/"> <h3 className="logo">GroceryHut <ShoppingBagOpen size={40} /></h3> </Link>
        <Link to="/"> Home </Link>
        
        <Link to="/contact"> Contact </Link>
        
        
        
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
        <Link to="./pages/login/login"> <User size={32} /> </Link>
      </div>
    </div>
  );
};
