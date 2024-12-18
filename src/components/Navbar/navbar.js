// import React, { useState } from "react";
// import "./navbar.css";
// import logo2 from "../../assets/Logo2.png";
// import { Link } from "react-router-dom";
// import CameraFeed from "../CameraFeed/cameraFeed";

// const LogoAndNavbar = () => {
//   const [showCamera, setShowCamera] = useState(false);

//   const toggleCameraFeed = () => {
//     setShowCamera(!showCamera);
//   };
//   return (
//     <div className="logo-and-navbar">
//       <a href="/Home">
//         <img className="logo" alt="Logo" src={logo2} />
//       </a>
//       {/* Camera Button */}
//       <button className="camera-button" onClick={toggleCameraFeed}>
//         📷
//       </button>

//       {/* Conditionally Render CameraFeed */}
//       {showCamera && <CameraFeed />}
//       <div className="navbar">
//         <Link
//           to="/Home"
//           className="text-wrapper-3"
//           style={{ textDecoration: "none" }}
//         >
//           Home
//         </Link>
//         <Link
//           to="/AboutUs"
//           className="text-wrapper-1"
//           style={{ textDecoration: "none" }}
//         >
//           About Us
//         </Link>
//         <Link
//           to="/Products"
//           className="text-wrapper-2"
//           style={{ textDecoration: "none" }}
//         >
//           Products
//         </Link>
//         <Link
//           to="/PromoCodes"
//           className="div"
//           style={{ textDecoration: "none" }}
//         >
//           Promo Codes
//         </Link>

//         <Link
//           to="/Checkout"
//           className="text-wrapper-4"
//           style={{ textDecoration: "none" }}
//         >
//           Checkout
//         </Link>
//       </div>
//     </div>
//   );
// };
// export default LogoAndNavbar;
import React, { useEffect, useState, useContext } from "react";
import "./navbar.css";
import { AiFillCamera } from "react-icons/ai";
import logo2 from "../../assets/Logo2.png";
import { useLocation, Link, useNavigate } from "react-router-dom";
import fetchCartItems from "../Content/cart_items";
import inventory from "../Products/inventory";
import { CartContext } from "../CartContext";
import CameraFeed from "../CameraFeed/cameraFeed"; // Import the new CameraFeed component

const LogoAndNavbar = () => {
  const [showCamera, setShowCamera] = useState(false);
  const location = useLocation(); // Get current route

  const toggleCameraFeed = () => {
    setShowCamera(!showCamera);
  };

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

  // const totalPrice = updatedCartItems.reduce(
  //   (total, item) => total + item.price * item.qty,
  //   0
  // );
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

      if (weightDifference > 100000000) {
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
  // useEffect(() => {
  //   console.log(showCamera);
  // }, []);

  return (
    <div className="logo-and-navbar">
      <a href="/Home">
        <img className="logo" alt="Logo" src={logo2} />
      </a>

      {/* Camera Button */}
      {location.pathname !== "/Checkout" && (
        <button className="camera-button" onClick={toggleCameraFeed}>
          <AiFillCamera />
        </button>
      )}

      {/* Conditionally Render CameraFeed */}
      {location.pathname !== "/Checkout" && (
        <CameraFeed cameraState={showCamera} />
      )}

      <div className="navbar">
        <Link
          to="/Home"
          className="text-wrapper-3"
          style={{ textDecoration: "none" }}
        >
          Home
        </Link>
        <Link
          to="/AboutUs"
          className="text-wrapper-1"
          style={{ textDecoration: "none" }}
        >
          About Us
        </Link>
        <Link
          to="/Products"
          className="text-wrapper-2"
          style={{ textDecoration: "none" }}
        >
          Products
        </Link>
        <Link
          to="/PromoCodes"
          className="div"
          style={{ textDecoration: "none" }}
        >
          Promo Codes
        </Link>
        <Link
          // to="/Checkout"
          onClick={handleCheckout}
          className="text-wrapper-4"
          style={{ textDecoration: "none" }}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default LogoAndNavbar;
