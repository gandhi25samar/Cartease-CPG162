import React from "react";
import alert from "../../assets/alert.jpg";
import "./alert.css";
const Alert = () => {
  return (
    <div className="alert-container">
      <img className="alert-image" alt="Alert" src={alert} />
      <p className="alert-text">The camera has been blocked. </p>
      <p className="alert-text">
        Please contact the administrator for resolution.
      </p>
    </div>
  );
};
export default Alert;
