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

import React, { useState, useEffect } from "react";
import fetchCartItems from "../Content/cart_items";
import coupons from "../PromoCodes/coupons";
import inventory from "../Products/inventory";
import "./contentCheckout.css";

const ContentCheckout = () => {
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const items = await fetchCartItems();
      setCartItems(items);
    };

    fetchData();
  }, []);

  // // Calculate the total cart value
  // const totalCartValue = cartItems.reduce(
  //   (total, item) => total + item.price * item.qty,
  //   0
  // );
  // Map product details from inventory to cart items
  const updatedCartItems = cartItems.map((cartItem) => {
    const inventoryItem = inventory.find(
      (item) => item.name === cartItem.productName
    );
    return {
      ...cartItem,
      price: inventoryItem?.price || 0, // Default to 0 if not found
      image: inventoryItem?.image || "default.jpg", // Fallback image
    };
  });

  // Calculate the total cart value
  const totalCartValue = updatedCartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const newTotal = totalCartValue - discountedTotal;

  // Handle promo code application
  const applyPromoCode = () => {
    // Find the promo code from the coupons.js file
    const promo = coupons.find(
      (coupon) => coupon.code === promoCode.toUpperCase()
    );

    if (!promo) {
      // If the promo code does not exist
      setPromoMessage("Invalid Promo Code");
      setDiscountedTotal(null);
      return;
    }

    if (totalCartValue < promo.minValue) {
      // If the minimum value requirement is not met
      setPromoMessage(
        `Minimum cart value of ₹${promo.minValue} is required to apply this code`
      );
      setDiscountedTotal(null);
    } else {
      // Calculate the discount based on the promo details
      let discount = promo.discount * totalCartValue;
      if (promo.discount <= 1) {
        // For percentage-based discounts, apply a max cap
        discount = Math.min(discount, promo.maxDiscount);
      }

      // Display success message and update the discounted total
      setPromoMessage(`Promo Code Applied: ${promo.description}`);
      setDiscountedTotal(discount);
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
            {updatedCartItems.map((item, index) => (
              <tr key={index}>
                {/*<tr key={item.id} >*/}
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
          className="div3"
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
            promoMessage.includes("Invalid") || promoMessage.includes("Minimum")
              ? "error"
              : "success"
          }`}
        >
          {promoMessage}
        </div>
        <div className="text-wrapper-14">Total Cart Value: ₹{newTotal}</div>
        <button className="button">
          <div className="text-wrapper-15">PROCEED TO PAYMENT</div>
        </button>
      </div>
    </div>
  );
};

export default ContentCheckout;
