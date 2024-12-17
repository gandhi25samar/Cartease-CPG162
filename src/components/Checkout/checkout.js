// import React from "react";
// import "./checkout.css";

// const checkout = () => {
//   return (
//     <div className="details">
//       <div className="text-wrapper">Enter details to get your bill</div>
//       <div className="mobile">
//         <div className="overlap-group">
//           <input className="div" placeholder="Mobile No." type="number" />
//         </div>
//       </div>
//       <div className="email">
//         <div className="overlap">
//           <input className="div" placeholder="Email" type="email" />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default checkout;

// import React, { useState } from "react";
// import "./checkout.css";
// import cartItems from "../Content/cart_items";

// const Checkout = () => {
//   const [mobile, setMobile] = useState("");

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
//   };

//   const sendBill = async () => {
//     const total = calculateTotal();
//     const message = `Your cart details:\n${cartItems
//       .map(
//         (item) =>
//           `${item.productName} - Qty: ${item.qty}, Price: ₹${item.price}`
//       )
//       .join("\n")}\nTotal: ₹${total}`;
//     try {
//       const response = await fetch("http://localhost:3001/send-sms", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           mobile: mobile, // Replace with the variable holding the user's input
//           message: message, // Replace with the cart details
//         }),
//       });

//       if (response.ok) {
//         const result = await response.text();
//         console.log("Message sent:", result);
//       } else {
//         console.error("Failed to send message:", response.status);
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="details">
//       <div className="text-wrapper">Enter details to get your bill</div>

//       <div className="mobile">
//         <div className="input-group">
//           <input
//             className="mobile-input"
//             placeholder="Mobile No."
//             type="number"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//           <button className="send-btn" onClick={sendBill}>
//             Send Bill
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import React, { useState, useEffect, useContext } from "react";
import "./checkout.css";
import fetchCartItems from "../Content/cart_items";
import inventory from "../Products/inventory";
import { CartContext } from "../CartContext";

const Checkout = () => {
  const predefinedEmails = ["arew_be21@thapar.edu", "sgandhi_be21@thapar.edu"];
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    const items = fetchCartItems(cart); // Pass cart to fetchCartItems
    setCartItems(items);
  }, [cart]);
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
  // Function to calculate total cart value
  const calculateTotal = () => {
    return updatedCartItems.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
  };

  // Function to send the bill email
  const sendEmail = async () => {
    // Reset notifications and errors
    setError("");
    setSuccessMessage("");

    setLoading(true); // Set loading state to true
    //const total = calculateTotal();
    const message = `
<h2>Your cart details:</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>S.No.</th>
      <th>Product</th>
      <th>Qty</th>
      <th>Price</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    ${updatedCartItems
      .map(
        (item, index) =>
          `<tr>
            <td>${index + 1}</td>
            <td>${item.productName}</td>
            <td>${item.qty}</td>
            <td>₹${item.price}</td>
            <td>₹${item.qty * item.price}</td>
          </tr>`
      )
      .join("")}
  </tbody>
</table>
<h3>Total Cart Value: ₹${calculateTotal()}</h3>
`;

    try {
      const response = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          message: message,
          isHtml: true,
        }),
      });

      if (response.ok) {
        //const result = await response.text();
        setSuccessMessage(`Bill sent to ${email}`);
      } else {
        setError("Failed to send email. Please enter a valid email id.");
      }
    } catch (error) {
      setError("An error occurred while sending the email. Please try again.");
    } finally {
      setLoading(false); // Remove loading state
    }
  };

  return (
    <div className="details">
      <div className="text-wrapper">Enter details to get your bill</div>

      <div className="email">
        <div className="input-group">
          <select
            className="email-input"
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            <option value="">Select Email Address</option>
            {predefinedEmails.map((emailOption, index) => (
              <option key={index} value={emailOption}>
                {emailOption}
              </option>
            ))}
          </select>
          <button
            className="send-btn"
            onClick={sendEmail}
            disabled={loading} // Disable button if loading
          >
            {loading ? "Sending..." : "Send Bill"}
          </button>
        </div>
      </div>

      {/* Display success or error messages */}
      {error && <div className="error-message">{error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default Checkout;
