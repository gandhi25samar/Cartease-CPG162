// // cart_items.js
// const cartItems = [
//   {
//     // id: 1,
//     productName: "Treat Chocolate Wafers",
//     qty: 1,
//     price: 20,
//     image: "treat.jpg",
//   },
//   {
//     // id: 2,
//     productName: "Bourbon Chocolate Biscuits",
//     qty: 1,
//     price: 30,
//     image: "bourbon.jpg",
//   },
//   {
//     // id: 3,
//     productName: "Tide Matic Top Load Detergent",
//     qty: 10,
//     price: 200,
//     image: "tide.jpg",
//   },
//   {
//     // id: 4,
//     productName: "Thums Up 1L Soft Drink",
//     qty: 6,
//     price: 110,
//     image: "thumbsup.jpg",
//   },
//   {
//     // id: 5,
//     productName: "Nabati Cheese Wafers",
//     qty: 2,
//     price: 20,
//     image: "nabati.jpg",
//   },
//   {
//     // id: 6,
//     productName: "Lays American Style Cream & Onion",
//     qty: 5,
//     price: 50,
//     image: "laysgreen50.jpg",
//   },
// ];

// export default cartItems;

// const cartItems = [
//   {
//     productName: "Treat Chocolate Wafers",
//     qty: 1,
//   },
//   {
//     productName: "Bourbon Chocolate Biscuits",
//     qty: 1,
//   },
//   {
//     productName: "Tide Matic Top Load Detergent",
//     qty: 20,
//   },
//   {
//     productName: "Thums Up 1L Soft Drink",
//     qty: 6,
//   },
//   {
//     productName: "Nabati Cheese Wafers",
//     qty: 2,
//   },
//   {
//     productName: "Lays American Style Cream & Onion",
//     qty: 5,
//   },
// ];

// export default cartItems;

// const fetchCartItems = async () => {
//   try {
//     const response = await fetch("http://localhost:5000/process-image", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ image: "" }), // Replace with real image data if required
//     });

//     // if (!response.ok) {
//     //   console.error("Failed to fetch cart items:", response.statusText);
//     //   return [];
//     // }

//     const data = await response.json();
//     // Transform backend data into cart items format
//     const cartItems = Object.entries(data.cart).map(([itemName, qty]) => ({
//       productName: itemName,
//       qty: qty,
//     }));

//     return cartItems;
//   } catch (error) {
//     console.error("Error fetching cart items:", error);
//     return [];
//   }
// };

// export default fetchCartItems;

// import { useContext } from "react";
// import { CartContext } from "../CartContext";

const fetchCartItems = (cart) => {
  //const { cart } = useContext(CartContext);

  // Transform the cart data into the desired format
  const cartItems = Object.entries(cart).map(([itemName, qty]) => ({
    productName: itemName,
    qty: qty,
  }));

  return cartItems;
};

export default fetchCartItems;
// const fetchCartItems = async () => {
//   try {
//     const response = await fetch("http://localhost:5000/process-image", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ image: "" }),
//     });
//     const data = await response.json();
//     return Object.entries(data.cart).map(([itemName, qty]) => ({
//       productName: itemName,
//       qty,
//     }));
//   } catch (error) {
//     console.error("Error fetching cart items:", error);
//     return [];
//   }
// };

// export default fetchCartItems;
