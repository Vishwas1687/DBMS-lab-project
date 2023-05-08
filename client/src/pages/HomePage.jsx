import React from 'react'
import Header from '../components/Layout/Header'
import {useAuth} from '../context/auth'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const HomePage = () => {
  const [auth,setAuth] = useAuth();

  return (
    <div>
      <Header />
      {/* <img src="https://img.freepik.com/free-photo/variety-fresh-tasty-vegetables-dark_1220-4444.jpg?w=1380&t=st=1683574655~exp=1683575255~hmac=e13185e4cd9e60dfcc0c6e46b4eddc1eee912cd5659588fbc4f1ce0255d827f5" alt="Example image" style={{ width: "100vw", height: "60vh" }} /> */}

    <Slider autoplay={true} autoplaySpeed={3000}>
  <div>
    <img src="https://img.freepik.com/free-photo/variety-fresh-tasty-vegetables-dark_1220-4444.jpg?w=1380&t=st=1683574655~exp=1683575255~hmac=e13185e4cd9e60dfcc0c6e46b4eddc1eee912cd5659588fbc4f1ce0255d827f5" alt="Example image" style={{ width: "100vw", height: "60vh" }} />
  </div>
  <div>
    <img src="https://img.freepik.com/free-photo/high-angle-indian-spices-arrangement_23-2148747644.jpg?w=1060&t=st=1683575187~exp=1683575787~hmac=0048f64b9f242a390cd00a7c15421e8535f73a67760a9c9d519cc83af749cf9c" alt="Example image" style={{ width: "100vw", height: "60vh" }} />
  </div>
  <div>
    <img src="https://img.freepik.com/free-photo/top-view-assortment-make-up-beauty-products_23-2148620013.jpg?w=1060&t=st=1683575257~exp=1683575857~hmac=24b76301ca16d225b963cf75cb9212b491d2a932f0c67539cce9f771bc39353a" alt="Example image" style={{ width: "100vw", height: "60vh" }} />
  </div>
  {/* <div>
    <img src="https://img.freepik.com/free-photo/pillow-bed_74190-6104.jpg?w=1060&t=st=1683575403~exp=1683576003~hmac=845d48a31f1bd0f78f863e34f3e7cb4c845c332343a0a916afd5af591d4e3488" alt="Example image" style={{ width: "100vw", height: "60vh" }} />
  </div> */}
</Slider>


    </div>
  )
}

export default HomePage
