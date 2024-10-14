import React from "react";
import "./checkout.css";

const checkout = () => {
  return (
    <div className="details">
      <div className="text-wrapper">Enter details to get your bill</div>
      <div className="mobile">
        <div className="overlap-group">
          <input className="div" placeholder="Mobile No." type="number" />
        </div>
      </div>
      <div className="email">
        <div className="overlap">
          <input className="div" placeholder="Email" type="email" />
        </div>
      </div>
    </div>
  );
};
export default checkout;
