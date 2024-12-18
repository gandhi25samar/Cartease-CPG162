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
// import React from "react";
// import cartItems from "./cart_items";
// import "./content.css";
// import inventory from "../Products/inventory";

// const Content = () => {
//   // Map product names from inventory to cart items
//   const updatedCartItems = cartItems.map((cartItem) => {
//     const inventoryItem = inventory.find(
//       (item) => item.name === cartItem.productName
//     );
//     return {
//       ...cartItem,
//       price: inventoryItem?.price || 0, // Default to 0 if not found
//       image: inventoryItem?.image || "default.jpg", // Fallback image
//     };
//   });

//   // // Calculate total price
//   // const totalPrice = cartItems.reduce(
//   //   (total, item) => total + item.price * item.qty,
//   //   0
//   // );
//   // Calculate total price
//   const totalPrice = updatedCartItems.reduce(
//     (total, item) => total + item.price * item.qty,
//     0
//   );

//   return (
//     <div className="content">
//       <div className="cart-table-wrapper-home">
//         <table className="cart-table">
//           <thead>
//             <tr>
//               <th>S.No.</th>
//               <th>Product</th>
//               <th>Name</th>
//               <th>Qty</th>
//               <th>Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {updatedCartItems.map((item, index) => (
//               <tr key={index}>
//                 {/*<tr key={item.id} >*/}
//                 <td>{index + 1}</td>
//                 <td>
//                   <img
//                     src={require(`../../assets/${item.image}`)}
//                     alt={item.productName}
//                     className="product-image"
//                   />
//                 </td>
//                 <td>{item.productName}</td>
//                 <td>{item.qty}</td>
//                 <td>₹{item.price}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="total-checkout">
//         <div className="total-cart-value">Total Cart Value: ₹{totalPrice}</div>
//         <button className="button">
//           <a
//             href="/Checkout"
//             className="checkout-link"
//             style={{ textDecoration: "none" }}
//           >
//             PROCEED TO CHECKOUT
//           </a>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Content;

import React, { useState, useEffect, useContext } from "react";
import fetchCartItems from "./cart_items";
import { Link, useNavigate } from "react-router-dom";
import inventory from "../Products/inventory";
import { CartContext } from "../CartContext";
import "./content.css";

const Content = () => {
  const [cartItems, setCartItems] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate(); // To programmatically navigate

  const BLYNK_API_URL = "https://blynk.cloud/external/api/get";
  const BLYNK_TOKEN = "BGSudAO4EWXMVv9LgIV-uGYhMv7x5M8p";
  const DATA_PIN = "v1"; // Replace with the actual pin from Blynk

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const items = await fetchCartItems(cart);
  //     setCartItems(items);
  //     // setLoading(false);
  //   };

  //   fetchData();
  // }, [cart]);
  useEffect(() => {
    const items = fetchCartItems(cart); // Pass cart to fetchCartItems
    setCartItems(items);
  }, [cart]);
  // if (loading) {
  //   return <div>Loading...</div>; // Optional loading indicator
  // }

  // Map cart items with inventory details
  const updatedCartItems = cartItems.map((cartItem) => {
    const inventoryItem = inventory.find(
      (item) => item.name === cartItem.productName
    );
    return {
      ...cartItem,
      price: inventoryItem?.price || 0, // Default to 0 if not found
      weight: inventoryItem?.weight || 0,
      image: inventoryItem?.image || "default.jpg", // Fallback image
    };
  });

  const totalPrice = updatedCartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const totalWeight = updatedCartItems.reduce(
    (total, item) => total + item.weight * item.qty,
    0
  );

  const handleCheckout = async () => {
    try {
      // Fetch weight from Blynk API
      const response = await fetch(
        `${BLYNK_API_URL}?token=${BLYNK_TOKEN}&${DATA_PIN}`
      );
      if (!response.ok) {
        alert("Failed to fetch weight from Blynk API");
        return;
      }

      const blynkWeight = parseFloat(await response.json());
      const weightDifference = Math.abs(totalWeight - blynkWeight);

      if (weightDifference > 10000000) {
        alert(
          `Weight mismatch! Calculated: ${totalWeight}, Measured: ${blynkWeight}. Difference: ${weightDifference}`
        );
      } else {
        navigate("/Checkout"); // Allow routing
      }
    } catch (error) {
      console.error("Error while fetching weight:", error);
      alert("An error occurred while verifying the weight.");
    }
  };

  return (
    <div className="content">
      <div className="cart-table-wrapper-home">
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
            {updatedCartItems.map((item, index) => (
              <tr key={index}>
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
      </div>

      <div className="total-checkout">
        <div className="total-cart-value">Total Cart Value: ₹{totalPrice}</div>
        <button className="button" onClick={handleCheckout}>
          {/* <Link
            to="/Checkout"
            className="checkout-link"
            style={{ textDecoration: "none" }}
          > */}
          PROCEED TO CHECKOUT
          {/* </Link> */}
        </button>
      </div>
    </div>
  );
};

export default Content;
