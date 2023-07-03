import React from 'react';
import { NavLink , Link} from 'react-router-dom';
import {ShoppingCart , ShoppingBag} from 'phosphor-react';
import Dropdown from './Dropdown'
import Modal from './Modal'
import DropdownCategories from './DropdownCategories';
import SearchBar from '../Form/SearchBar';
import { useCart } from '../../context/cart';
import { Badge } from 'antd'

const Header = () => {

  const [cart] = useCart()

  return (
    <>
<nav className="navbar navbar-expand-lg" style={{backgroundColor: '#32CD00',color:'#FFF'}}>
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
      <Link to="/" className="navbar-brand">
        <span style={{'font-weight':'bold','font-size':'1.5rem',color:'#FFF'}}>GroceryHut </span>
        <ShoppingBag size={40} style={{'color':'#FFF'}}/>
      </Link>
      &nbsp;&nbsp;
      <DropdownCategories />
      <div className="ms-auto d-flex align-items-center">
        <div style={{ marginRight: '10rem' }}>
          <SearchBar />
        </div>
      </div>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item" style={{'margin-right':'1rem'}}>
          <Dropdown />
        </li>
        <li className="nav-item" style={{'margin-left':'1rem','margin-right':'1rem'}}>
          <Badge count={cart?.length} showZero>
            <NavLink to="/cart" className="nav-link" href="#">
              <ShoppingCart size={32} style={{'font-weight':'bold',color:'white'}}/>
            </NavLink>
          </Badge>
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