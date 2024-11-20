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
import React, { useState } from "react";
import "./navbar.css";
import { AiFillCamera } from "react-icons/ai";
import logo2 from "../../assets/Logo2.png";
import { Link } from "react-router-dom";
import CameraFeed from "../CameraFeed/cameraFeed"; // Import the new CameraFeed component

const LogoAndNavbar = () => {
  const [showCamera, setShowCamera] = useState(false);

  const toggleCameraFeed = () => {
    setShowCamera(!showCamera);
  };

  return (
    <div className="logo-and-navbar">
      <a href="/Home">
        <img className="logo" alt="Logo" src={logo2} />
      </a>

      {/* Camera Button */}
      <button className="camera-button" onClick={toggleCameraFeed}>
        <AiFillCamera />
      </button>

      {/* Conditionally Render CameraFeed */}
      {showCamera && <CameraFeed />}

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
          to="/Checkout"
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
