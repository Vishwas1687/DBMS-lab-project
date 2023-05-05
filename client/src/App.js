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
import Profile from "./pages/user/Profile";
import CreateCategory from "./pages/admin/CreateCategory";
import ViewCategory from "./pages/admin/ViewCategory";
import {Toaster} from 'react-hot-toast';
import UpdateCategory from "./pages/admin/Category/UpdateCategory";

function App() {
  return (
    <>
    <Toaster/>
    <Routes>

      <Route path = "/" element = {<HomePage />} />
      
      <Route path = "/user" element = {<Dashboard />} />
      <Route path = "/user/orders" element = {<Orders/>} />
      <Route path = "/user/profile" element = {<Profile />} />
      
      <Route path = "/admin" element = {<AdminDashboard />} />
      <Route path = "/admin/manage-category" element = {<ManageCategory />} />
      <Route path = "/admin/get-category/:slug" element = {<GetCategory />} />
      <Route path = "/admin/update-category/:slug" element = {<UpdateCategory/>} />
      <Route path = "/admin/users" element = {<Users />} />
      <Route path = "/admin/create-category" element={<CreateCategory/>}></Route>
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
