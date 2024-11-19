import React from "react";
import Logo from "../../assets/Logo.png";
import "./start.css";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="start">
      <div className="div">
        <img className="image" alt="Image_Logo" src={Logo} />
        <button className="button">
          <Link
            to="/Home"
            className="text-wrapper"
            style={{ textDecoration: "none" }}
          >
            START SHOPPING
          </Link>
        </button>
      </div>
    </div>
  );
};
export default Start;
