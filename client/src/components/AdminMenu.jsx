import React from 'react'
import { NavLink } from 'react-router-dom'
import {baseUrl} from './../baseUrl'

const AdminMenu = () => {
  return (
    <>
    <div class = "text-center">

    <div className="list-group">
  <h4 style={{'font-weight':'bold'}}>Admin Dashboard</h4>

  <NavLink to="/admin/update-profile" className="list-group-item list-group-item-action"
  style={{'border':'1px solid #111','font-weight':'bold'}}>
    Update Profile
    
  </NavLink>
  <NavLink to="/admin/manage-category" className="list-group-item list-group-item-action"
  style={{'border':'1px solid #111','font-weight':'bold'}}>
    Manage Category
    
  </NavLink>
  <NavLink to="/admin/create-category" className="list-group-item list-group-item-action"
  style={{'border':'1px solid #111','font-weight':'bold'}}>
    Create Category
    
  </NavLink>
  <NavLink to="/admin/create-product" className="list-group-item list-group-item-action"
  style={{'border':'1px solid #111','font-weight':'bold'}}>
    Create Product
  </NavLink>
  <NavLink to="/admin/manage-product" className="list-group-item list-group-item-action"
  style={{'border':'1px solid #111','font-weight':'bold'}}>
    Manage Product
  </NavLink>
  <NavLink to="/admin/manage-brand" className="list-group-item list-group-item-action"
  style={{'border':'1px solid #111','font-weight':'bold'}}>
    Manage Brand
  </NavLink>
  <NavLink to="/admin/orders" className="list-group-item list-group-item-action"
  style={{'border':'1px solid #111','font-weight':'bold'}}>
    Orders
  </NavLink>
  <NavLink to="/admin/users" className="list-group-item list-group-item-action"
  style={{'border':'1px solid #111','font-weight':'bold'}}>
    Users
  </NavLink>

  
</div>
    </div>


    </>
  )
}

export default AdminMenu
