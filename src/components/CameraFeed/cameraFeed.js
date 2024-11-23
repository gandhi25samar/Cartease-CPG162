import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import "./cameraFeed.css";

const CameraFeed = ({cameraState}) => {
  const webcamRef = useRef(null);



  // Function to capture and send frames to the backend
  const sendFrameToBackend = async () => {

    
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const base64Image = imageSrc.split(",")[1]; // Extract base64 string

        try {
          const response = await fetch("http://localhost:5000/process-image", {
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
    }, 1000); // Capture every second


    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);


 

  return (
    <div
      className="webcam-container"
      style={{ opacity: cameraState ? 1 : 0, transition: "opacity 0.5s ease" }}
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
