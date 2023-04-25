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

  const slides = [
    { url: "https://dealroup.com/wp-content/uploads/2020/05/Grocery-Offers.jpg", title: "rice" },
    { url: "https://img.freepik.com/premium-psd/vegetable-grocery-delivery-promotion-web-banner-instagram-social-media-post-template_502896-62.jpg", title: "boat" },
    { url: "https://st3.depositphotos.com/7341970/33687/v/1600/depositphotos_336878556-stock-illustration-grocery-shopping-promotional-sale-advertisement.jpg", title: "forest" },
    { url: "https://blogger.googleusercontent.com/img/a/AVvXsEgYfPkQhIhftLH0uCFDB8uQUzSR6yl7DWtRdmdONETTZkcHr0u5atbrx5yOBPw0iBgpNWhELFTjHCdp1BZg_uVkApVFoaQS7bC20bwp38SaTaPG8hlz_Q78V2F9JlY-HD_BEg3pjMLKRpj3J4q05PBZiN_voeMBvWOOXrETJTmfnf__BoyW64mzLv3h=s16000", title :"offer"},
    { url: "https://dailyshopp.in/dailyshop/assets/images/hot_product/grceries_Banner.png", title: "grocery"}
  ];
  const containerStyles = {
    width: "1500px",
    height: "600px",
    margin: "0 auto",
  };
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
