// CameraFeed.js
import React, { useRef } from "react";
import Webcam from "react-webcam";
import "./cameraFeed.css";

const CameraFeed = () => {
  const webcamRef = useRef(null);

  // Function to capture a screenshot from the webcam
  const captureScreenshot = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("Captured Image: ", imageSrc); // Use this for backend processing
    // You can send `imageSrc` to the backend here if needed
  };

  return (
    <div className="webcam-container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam"
      />
      <button className="capture-button" onClick={captureScreenshot}>
        Capture
      </button>
    </div>
  );
};

export default CameraFeed;
