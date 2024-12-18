import React, { useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Webcam from "react-webcam";
import { CartContext } from "../CartContext";
import "./cameraFeed.css";

const CameraFeed = ({ cameraState }) => {
  const webcamRef = useRef(null);
  const { setCart } = useContext(CartContext);
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to capture and send frames to the backend
  const sendFrameToBackend = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const base64Image = imageSrc.split(",")[1]; // Extract base64 string

        try {
          const response = await fetch("http://127.0.0.1:4040/process-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: base64Image }),
          });

          const data = await response.json();
          console.log("Cart Contents:", data.cart); // Update your UI with cart data
          console.log("Detections:", data.detections); // Log detected items
          console.log("Camera Blocked? :", data.camera_blocked); // Log detected items
          setCart(data.cart);

          // Check if camera is blocked and navigate to "/Alert"
          if (data.camera_blocked) {
            navigate("/Alert");
          }
        } catch (error) {
          console.error("Error sending frame to backend:", error);
        }
      }
    }
  };

  // Send frames at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      sendFrameToBackend();
    }, 800); // Capture every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    // <div
    //   className="webcam-container"
    //   style={{ opacity: cameraState ? 1 : 0, transition: "opacity 0.5s ease" }}
    // >
    <div
      className="webcam-container"
      style={{
        visibility: cameraState ? "visible" : "hidden",
        pointerEvents: cameraState ? "auto" : "none", // Prevent interaction when hidden
        opacity: cameraState ? 1 : 0,
        transition: "opacity 0.5s ease, visibility 0.5s ease",
      }}
    >
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam"
      />
    </div>
  );
};

export default CameraFeed;
