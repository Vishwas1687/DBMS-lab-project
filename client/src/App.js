import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";
import { SearchBar } from "./components/searchbar";
import {ImageSlider} from "./components/ImageSlider";

function App() {
  return (
    <div className="App">
      <div className="logo">
        
      </div>
      <ShopContextProvider>
      
        <Router>
          <Navbar />
          <br></br>
          <SearchBar />
          <br></br>

          <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>

        

        
        
      </ShopContextProvider>

      
        
      

      
    </div>
  );
}

export default App;
