import React from "react";
import alert from "../../assets/alert.jpg";
import "./alert.css";
import { Link } from "react-router-dom";
const Alert = () => {
  return (
    <div className="alert-container">
      <img className="alert-image" alt="Alert" src={alert} />
      <p className="alert-text">The camera has been blocked. </p>
      <p className="alert-text">
        Please contact the administrator for resolution.
      </p>
      <button className="button-alert">
        <Link
          to="/Home"
          className="text-wrapper"
          style={{ textDecoration: "none" }}
        >
          Go Back To Home
        </Link>
      </button>
    </div>
  );
};
export default Alert;
