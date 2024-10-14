import React from "react";
import "./promocode.css";

const PromoCodes = () => {
  return (
    <div className="promo-codes">
      <div className="div">
        <div className="promo-code">
          <p className="code">
            <span className="span">Code:</span>
            <span className="text-wrapper-6"> GET10</span>
          </p>
          <p className="minimum-cart-value">
            Minimum Cart Value: ₹1000
            <br />
            Description: Apply this promo code to get a flat 10% off on your
            cart value up to ₹150.
          </p>
        </div>
        <div className="promo-code-2">
          <p className="code-flat">
            <span className="span">Code:</span>
            <span className="text-wrapper-6"> FLAT200</span>
          </p>
          <p className="minimum-cart-value">
            Minimum Cart Value: ₹1800
            <br />
            Description: Apply this promo code to get a flat ₹200 off on your
            cart value.
          </p>
        </div>
        <div className="promo-code-3">
          <p className="code-PAYDAYDEAL">
            <span className="span">Code:</span>
            <span className="text-wrapper-6"> PAYDAYDEAL</span>
          </p>
          <p className="minimum-cart-value">
            Minimum Cart Value: ₹2500
            <br />
            Description: Apply this promo code to get a flat 20% off on your
            cart value up to ₹500.
          </p>
        </div>
      </div>
    </div>
  );
};
export default PromoCodes;
