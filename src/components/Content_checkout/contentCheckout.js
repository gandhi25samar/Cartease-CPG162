import React from "react";
import "./contentCheckout.css";
import thumbsup from "../../assets/thumbsup.jpg";
import bourbon from "../../assets/bourbon.jpg";
import treat from "../../assets/treat.jpg";

const ContentCheckout = () => {
  return (
    <div className="content">
      <div className="headings">
        <div className="text-wrapper">S.No.</div>
        <div className="div">Product</div>
        <div className="text-wrapper-2">Name</div>
        <div className="text-wrapper-3">Qty</div>
        <div className="text-wrapper-4">Price</div>
      </div>
      <div className="items">
        <div className="s-no">
          <div className="text-wrapper-5">1.</div>
          <div className="text-wrapper-6">2.</div>
          <div className="text-wrapper-7">3.</div>
        </div>
        <div className="product">
          <img className="treat" alt="Treat" src={treat} />
          <img className="bourbon" alt="Bourbon" src={bourbon} />
          <img className="thumbsup" alt="Thumbsup" src={thumbsup} />
        </div>
        <div className="name">
          <div className="text-wrapper-8">Treat Chocolate Wafers</div>
          <div className="text-wrapper-9">Bourbon Chocolate Biscuits</div>
          <p className="p">Thums Up 1L Soft Drink</p>
        </div>
        <div className="qty">
          <div className="text-wrapper-10">1</div>
          <div className="text-wrapper-11">2</div>
          <div className="text-wrapper-12">1</div>
        </div>
        <div className="price">
          <div className="text-wrapper-10">₹20</div>
          <div className="text-wrapper-13">₹110</div>
          <div className="text-wrapper-12">₹30</div>
        </div>
      </div>
      <div className="total-checkout">
        <input className="div2" placeholder="Apply Promo Code" type="text" />
        <div className="text-wrapper-14">Total Cart Value : ₹160</div>
        <button className="button">
          <div className="text-wrapper-15">PROCEED TO PAYMENT</div>
        </button>
      </div>
    </div>
  );
};
export default ContentCheckout;
