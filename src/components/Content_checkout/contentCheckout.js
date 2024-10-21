// import React from "react";
// import "./contentCheckout.css";
// import thumbsup from "../../assets/thumbsup.jpg";
// import bourbon from "../../assets/bourbon.jpg";
// import treat from "../../assets/treat.jpg";

// const ContentCheckout = () => {
//   return (
//     <div className="content">
//       <div className="headings">
//         <div className="text-wrapper">S.No.</div>
//         <div className="div">Product</div>
//         <div className="text-wrapper-2">Name</div>
//         <div className="text-wrapper-3">Qty</div>
//         <div className="text-wrapper-4">Price</div>
//       </div>
//       <div className="items">
//         <div className="s-no">
//           <div className="text-wrapper-5">1.</div>
//           <div className="text-wrapper-6">2.</div>
//           <div className="text-wrapper-7">3.</div>
//         </div>
//         <div className="product">
//           <img className="treat" alt="Treat" src={treat} />
//           <img className="bourbon" alt="Bourbon" src={bourbon} />
//           <img className="thumbsup" alt="Thumbsup" src={thumbsup} />
//         </div>
//         <div className="name">
//           <div className="text-wrapper-8">Treat Chocolate Wafers</div>
//           <div className="text-wrapper-9">Bourbon Chocolate Biscuits</div>
//           <p className="p">Thums Up 1L Soft Drink</p>
//         </div>
//         <div className="qty">
//           <div className="text-wrapper-10">1</div>
//           <div className="text-wrapper-11">2</div>
//           <div className="text-wrapper-12">1</div>
//         </div>
//         <div className="price">
//           <div className="text-wrapper-10">₹20</div>
//           <div className="text-wrapper-13">₹110</div>
//           <div className="text-wrapper-12">₹30</div>
//         </div>
//       </div>
//       <div className="total-checkout">
//         <input className="div2" placeholder="Apply Promo Code" type="text" />
//         <div className="text-wrapper-14">Total Cart Value : ₹160</div>
//         <button className="button">
//           <div className="text-wrapper-15">PROCEED TO PAYMENT</div>
//         </button>
//       </div>
//     </div>
//   );
// };
// export default ContentCheckout;

import React, { useState } from "react";
import cartItems from "../Content/cart_items";
import coupons from "../PromoCodes/coupons";
import "./contentCheckout.css";

const ContentCheckout = () => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");

  // Calculate total cart value before discount
  const totalCartValue = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // Calculate total cart value after applying discount
  const discountedValue = totalCartValue - discount;

  const applyPromoCode = () => {
    const coupon = coupons.find((c) => c.code === promoCode);

    if (!coupon) {
      setMessage("Invalid Promo Code");
      setDiscount(0);
    } else if (totalCartValue < coupon.minValue) {
      setMessage("Minimum cart value not met");
      setDiscount(0);
    } else {
      if (coupon.code === "GET10") {
        const discountAmount = Math.min(totalCartValue * 0.1, 150);
        setDiscount(discountAmount);
        setMessage("Promo Code Applied");
      } else if (coupon.code === "FLAT200") {
        setDiscount(200);
        setMessage("Promo Code Applied");
      } else if (coupon.code === "PAYDAYDEAL") {
        const discountAmount = Math.min(totalCartValue * 0.2, 500);
        setDiscount(discountAmount);
        setMessage("Promo Code Applied");
      }
    }
  };

  return (
    <div className="content">
      <div className="cart-table-wrapper">
        <table className="cart-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Product</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={require(`../../assets/${item.image}`)}
                    alt={item.productName}
                    className="product-image"
                  />
                </td>
                <td>{item.productName}</td>
                <td>{item.qty}</td>
                <td>₹{item.price}</td>
                <td>₹{item.price * item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="total-checkout">
        <input
          className="div2"
          placeholder="Apply Promo Code"
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
        />
        <button onClick={applyPromoCode} className="apply-button">
          Apply
        </button>
        <div
          className={`promo-message ${
            message.includes("Invalid") || message.includes("Minimum")
              ? "error"
              : "success"
          }`}
        >
          {message}
        </div>
        <div className="text-wrapper-14">
          Total Cart Value: ₹{discountedValue}
        </div>
        <button className="button">
          <div className="text-wrapper-15">PROCEED TO PAYMENT</div>
        </button>
      </div>
    </div>
  );
};

export default ContentCheckout;
