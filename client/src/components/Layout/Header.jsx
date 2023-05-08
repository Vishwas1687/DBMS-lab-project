import React from 'react';
import { NavLink , Link} from 'react-router-dom';
import {ShoppingCart , ShoppingBag} from 'phosphor-react';
import Dropdown from './Dropdown'
import Modal from './Modal'
import DropdownCategories from './DropdownCategories';


const Header = () => {

  return (
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarTogglerDemo01"
      aria-controls="navbarTogglerDemo01"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to = "/" className="navbar-brand">
        GroceryHut <ShoppingBag size={32} />
      </Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

        <li className="nav-item">
          <DropdownCategories />
        </li>
        <li className="nav-item">
          <Dropdown />        
        </li>

        <li className="nav-item">
          <NavLink to = "/cart" className="nav-link" href="#">
          <ShoppingCart size={32} />
          </NavLink>
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>
  <Modal />


    </>
  )
}

export default Header