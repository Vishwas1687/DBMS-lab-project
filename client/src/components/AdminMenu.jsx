import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <>
    <div class = "text-center">

    <div className="list-group">
  <h4>Admin Page</h4>

  <NavLink to="/admin/manage-category" className="list-group-item list-group-item-action">
    Manage Category
    
  </NavLink>
  <NavLink to="/admin/create-category" className="list-group-item list-group-item-action">
    Create Category
    
  </NavLink>
  <NavLink to="/admin/create-product" className="list-group-item list-group-item-action">
    Create Product
  </NavLink>
  <NavLink to="/admin/manage-product" className="list-group-item list-group-item-action">
    Manage Product
  </NavLink>
  <NavLink to="/admin/manage-brand" className="list-group-item list-group-item-action">
    Manage Brand
  </NavLink>
  <NavLink to="/admin/users" className="list-group-item list-group-item-action">
    Users
  </NavLink>

  
</div>
    </div>


    </>
  )
}

export default AdminMenu
