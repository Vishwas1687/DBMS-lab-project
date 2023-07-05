import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
    <div class = "text-center">

    <div className="list-group">
  <h4>User Dashboard</h4>
  <NavLink to="/user/update-profile" className="list-group-item list-group-item-action"
  style={{'font-weight':'bold','border':'1px solid #111'}}>
    Profile
  </NavLink>
  <NavLink to="/user/orders" className="list-group-item list-group-item-action"
  style={{'font-weight':'bold','border':'1px solid #111'}}>
    Orders
  </NavLink>

  
</div>
    </div>


    </>
  )
}

export default UserMenu
