import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "./components/Start/start";
import Home from "./components/Home/home";
import AboutUs from "./components/AboutUs/aboutus";
import Navbar from "./components/Navbar/navbar";
import PromoCodes from "./components/PromoCodes/promocode";
import Checkout from "./components/Checkout/checkout";
import ContentCheckout from "./components/Content_checkout/contentCheckout";
import Products from "./components/Products/products";
import Alert from "./components/Alert/alert";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route
          path="/AboutUs"
          element={
            <>
              <Navbar />
              <AboutUs />
            </>
          }
        ></Route>
        <Route
          path="/PromoCodes"
          element={
            <>
              <Navbar />
              <PromoCodes />
            </>
          }
        ></Route>
        <Route
          path="/Checkout"
          element={
            <>
              <Navbar />
              <Checkout />
              <ContentCheckout />
            </>
          }
        ></Route>
        <Route
          path="/Products"
          element={
            <>
              <Navbar />
              <Products />
            </>
          }
        ></Route>
        <Route path="/Alert" element={<Alert />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;




