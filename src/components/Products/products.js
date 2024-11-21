// import React from "react";
// import "./products.css";
// import thumbsup from "../../assets/thumbsup.jpg";
// import bourbon from "../../assets/bourbon.jpg";
// import treat from "../../assets/treat.jpg";
// import tide from "../../assets/tide.jpg";

// const products = () => {
//   return (
//     <div className="contentP">
//       <input className="div2" placeholder="Search" type="search" />
//       <div className="headings">
//         <div className="text-wrapper">S.No.</div>
//         <div className="div">Product</div>
//         <div className="text-wrapper-2">Name</div>
//         <div className="text-wrapper-3">Price</div>
//       </div>
//       <div className="items">
//         <div className="s-no">
//           <div className="text-wrapper-4">1.</div>
//           <div className="text-wrapper-5">4.</div>
//           <div className="text-wrapper-6">2.</div>
//           <div className="text-wrapper-7">3.</div>
//         </div>
//         <div className="product">
//           <img className="treat" alt="Treat" src={treat} />
//           <img className="bourbon" alt="Bourbon" src={bourbon} />
//           <img className="thumbsup" alt="Thumbsup" src={thumbsup} />
//           <img className="tide" alt="Tide" src={tide} />
//         </div>
//         <div className="name">
//           <div className="text-wrapper-8">Treat Chocolate Wafers</div>
//           <div className="text-wrapper-9">Bourbon Chocolate Biscuits</div>
//           <p className="p">Thums Up 1L Soft Drink</p>
//           <p className="text-wrapper-10">Tide Matic Top Load Detregent</p>
//         </div>
//         <div className="price">
//           <div className="text-wrapper-11">₹20</div>
//           <div className="text-wrapper-12">₹200</div>
//           <div className="text-wrapper-13">₹110</div>
//           <div className="text-wrapper-14">₹30</div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default products;

import React, { useState } from "react";
import "./products.css";
import inventory from "./inventory"; // Importing the inventory

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search input
  const filteredProducts = inventory.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contentP">
      <input
        className="div2"
        placeholder="Search"
        type="search"
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        value={searchTerm}
      />
      <table className="product-table">
        <thead>
          <tr>
            {/*<tr key={product.id} >*/}
            <th>S.No.</th>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>
                <img
                  className="product-image"
                  src={require(`../../assets/${product.image}`)}
                  alt={product.name}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
