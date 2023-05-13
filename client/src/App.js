import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import GetCategory from './pages/admin/Category/GetCategory.jsx'
// import PrivateRoute from "./components/Routes/Private";
// import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCategory from "./pages/admin/ManageCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Orders from "./pages/user/Orders";
import UpdateProfile from "./pages/user/UpdateProfile";
import UpdateCategory from './pages/admin/Category/UpdateCategory.jsx'
import CreateCategory from "./pages/admin/CreateCategory";
// import ViewCategory from "./pages/admin/ViewCategory";
import { Toaster } from "react-hot-toast";
import ManageProduct from "./pages/admin/ManageProduct";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import ManageBrand from "./pages/admin/ManageBrand";
import GetProduct from "./pages/admin/Product/GetProduct";
import UpdateProduct from './pages/admin/Product/UpdateProduct'
import CreateWeight from './pages/admin/CreateWeight'
import UpdateWeight from './pages/admin/UpdateWeight'
import CategoryProduct from './pages/CategoryProduct'
import SubCategoryProduct from './pages/SubCategoryProduct'


function App() {
  return (
    <>
    <Toaster/>
    <Routes>

      <Route path = "/" element = {<HomePage />} />
      
      <Route path='/user' element={<PrivateRoute />}>
        <Route path = "" element = {<Dashboard />} />
        <Route path = "orders" element = {<Orders/>} />
        <Route path = "update-profile" element = {<UpdateProfile />} />
        
      </Route>

      <Route path='/admin' element={ <AdminRoute /> }>
        <Route path = "" element = {<AdminDashboard />} />
        <Route path = "/admin/manage-category" element = {<ManageCategory />} />
        <Route path = "/admin/get-category/:slug" element = {<GetCategory />} />
        <Route path = "/admin/users" element = {<Users />} />
        <Route path = "/admin/create-category" element={<CreateCategory/>}></Route>
        {/* <Route path = "/admin/manage-category/category/:categorySlug" element={<ViewCategory />} /> */}
        <Route path = "/admin/manage-product" element = {<ManageProduct />} /> 
        <Route path = "/admin/manage-product/product/:slug" element = {<GetProduct />} />
        <Route path = "/admin/update-product/:slug" element = {<UpdateProduct/>} />
        <Route path = "/admin/create-product" element = {<CreateProduct />} />
        <Route path = "/admin/update-category/:slug" element = {<UpdateCategory/>}/>
        <Route path = "/admin/get-product/create-weight/:slug" element = {<CreateWeight/>}/>
        <Route path = "/admin/manage-brand" element = {<ManageBrand />} />
        <Route path = '/admin/update-weight/:slug/:weight_id' element={<UpdateWeight/>}/>
      </Route>

      <Route path = '/category/:slug' element = {<CategoryProduct/>}/>
      <Route path = '/subcategory/:slug/:subcategory_id' element ={<SubCategoryProduct/>}/>

      <Route path = "/register" element = {<Register />} />
      <Route path = "/forgot-password" element = {<ForgotPassword />} />

      <Route path = "/about" element = {<About />} />
      <Route path = "/contact" element = {<Contact />} />
      <Route path = "/policy" element = {<Policy />} />
      <Route path = "/*" element = {<PageNotFound />} />

    </Routes>
    </>
  );
}

export default App;
