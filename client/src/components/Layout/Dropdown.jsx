import React from 'react'
import {User} from 'phosphor-react'
import { NavLink , Link} from 'react-router-dom';
import { useState } from 'react';
import '../styles/Dropdown.css'

export default function Dropdown() {

    const [showMenu, setShowMenu] = useState(false);

    const handleMenuToggle = () =>{
        setShowMenu(!showMenu);
    }

    return (
    <div className="dropdown dropdown-hover position-static" onMouseEnter={handleMenuToggle} onMouseLeave={handleMenuToggle}>
        <NavLink className='nav-link'>
        <User size={32} />
        </NavLink>
      <div className={`dropdown-menu ${showMenu ? 'show' : ''} positionDropDown`} >
        <a className="dropdown-item position-static" href="#" data-toggle="modal" data-target="#exampleModalCenter">Log In</a>
      </div>
    </div>
  )
}
