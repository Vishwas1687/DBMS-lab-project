import React from 'react';
import { NavLink , Link} from 'react-router-dom';
import {ShoppingCart , ShoppingBag} from 'phosphor-react';
import Dropdown from './Dropdown'
import Modal from './Modal'
import DropdownCategories from './DropdownCategories';
import SearchBar from '../Form/SearchBar';
import { useCart } from '../../context/cart';
import { Badge } from 'antd'
import {Menu,Dropdown as AntDropdown} from 'antd'
import {baseUrl} from '../../baseUrl'
import {Buffer} from 'buffer'

const Header = () => {

  const [cart] = useCart()

  const totalPrice = () => {
        try {
            let total = 0
            cart?.map((item) => {
                total = total + item.sp*item.quantity
            })
            return total
        } catch (error) {
            
        }
    }

  const menu = (
  <Menu style={{'border':'3px solid #111','min-height':'2rem','max-height':'25rem','overflow-y':'auto'}}>
    <Menu.Item style={{'font-weight':'bold','font-size':'1.4rem','text-align':'center'}}>Basket Summary</Menu.Item>
    {cart.map((item, index) => (
      <Menu.Item key={index} style={{'font-size':'1.2rem','border':'2px solid #111','margin-bottom':'0.2rem'}}>
        <Link to={`/product/${item.product.slug}`}>
          <img src={`${baseUrl}/api/products/get-photo/${item.product.slug}`}
          height={'50px'}/>
           {item.quantity} {item.product.product_name} -  {item.weight}{item.weightUnits} = {item.sp}*{item.quantity}={item.sp*item.quantity}
        </Link>
      </Menu.Item>
    ))}
    <Menu.Item>
         <li style={{'font-size':'1.2rem','color':'blue','font-weight':'bold'}}>{`Total basket price - ${totalPrice()}`}</li>
    </Menu.Item>
  </Menu>
);

  return (
    <>
<nav className="navbar navbar-expand-lg">
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
        <span>GroceryHut </span>
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
         <li className="nav-item" style={{ marginLeft: '1rem', marginRight: '1rem' }}>
    <Badge count={cart?.length} showZero>
      <AntDropdown overlay={menu} placement="bottomRight" arrow>
        <NavLink to="/cart" className="nav-link" href="#">
          <ShoppingCart size={32} />
        </NavLink>
      </AntDropdown>
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