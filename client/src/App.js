import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
// import PrivateRoute from "./components/Routes/Private";
// import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCategory from "./pages/admin/ManageCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import CreateCategory from "./pages/admin/CreateCategory";
import ViewCategory from "./pages/admin/ViewCategory";




function App() {
  return (
    <>
    <Routes>

      <Route path = "/" element = {<HomePage />} />
      
      <Route path = "/user" element = {<Dashboard />} />
      <Route path = "/user/orders" element = {<Orders/>} />
      <Route path = "/user/profile" element = {<Profile />} />
        
      

      
      <Route path = "/admin" element = {<AdminDashboard />} />
      <Route path = "/admin/manage-category" element = {<ManageCategory />} />
      <Route path = "/admin/create-product" element = {<CreateProduct />} />
      <Route path = "/admin/users" element = {<Users />} />
      <Route path = "/admin/create-category" element={<CreateCategory/>}></Route>
      <Route path = "/admin/manage-category/category/:categorySlug" element={<ViewCategory />} />
      
      <Route path = "/register" element = {<Register />} />
      <Route path = "/login" element = {<Login />} />

      <Route path = "/about" element = {<About />} />
      <Route path = "/contact" element = {<Contact />} />
      <Route path = "/policy" element = {<Policy />} />
      <Route path = "/*" element = {<PageNotFound />} />

    </Routes>
    </>
  );
}

export default App;
