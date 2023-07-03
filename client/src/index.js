import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "antd/dist/reset.css";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from './context/auth';
import { SearchProvider } from './context/search';
import { CartProvider } from './context/cart';
import { QuantityProvider } from './context/quantity';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <QuantityProvider>
        <BrowserRouter>
        
            <App />
        
      
        </BrowserRouter>
        </QuantityProvider>
      </CartProvider>
    </SearchProvider>
    
  </AuthProvider>
  

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
