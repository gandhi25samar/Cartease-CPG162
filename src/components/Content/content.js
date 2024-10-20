// import React from "react";
// import "./content.css";
// import thumbsup from "../../assets/thumbsup.jpg";
// import bourbon from "../../assets/bourbon.jpg";
// import treat from "../../assets/treat.jpg";
// import { Link } from "react-router-dom";

// const Content = () => {
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
//         <div className="text-wrapper-14">Total Cart Value : ₹160</div>
//         <button className="button">
//           <Link
//             to="/Checkout"
//             className="text-wrapper-15"
//             style={{ textDecoration: "none" }}
//           >
//             PROCEED TO CHECKOUT
//           </Link>
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Content;

// content.js
import React from "react";
import cartItems from "./cart_items";
import "./content.css";

const Content = () => {
  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div className="content">
      <table className="cart-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Product</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
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
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total-checkout">
        <div className="total-cart-value">Total Cart Value: ₹{totalPrice}</div>
        <button className="button">
          <a
            href="/Checkout"
            className="checkout-link"
            style={{ textDecoration: "none" }}
          >
            PROCEED TO CHECKOUT
          </a>
        </button>
      </div>
    </div>
  );
};

export default Content;
