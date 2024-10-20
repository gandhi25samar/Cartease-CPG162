import React from "react";
import "./aboutus.css";
import image from "../../assets/cart.jpg";

const AboutUs = () => {
  return (
    <div className="content">
      <div className="overlap-group">
        <p className="welcome-to-cartease">
          Welcome to CartEase, where innovation meets convenience in the retail
          world. At CartEase, we&#39;re passionate <br />
          about transforming the shopping experience for both retailers and
          consumers. Our mission is to revolutionize the <br />
          way people shop by leveraging cutting-edge technology to streamline
          processes and enhance efficiency.
          <br />
          <br />
          Founded by a team of visionary entrepreneurs, CartEase is driven by a
          commitment to delivering exceptional value <br />
          and service to our customers. With a deep understanding of the
          challenges facing the retail industry, we set out to <br />
          create a solution that addresses pain points and elevates the overall
          shopping experience.
          <br />
          <br />
          At CartEase, we believe in the power of innovation to drive positive
          change. Our smart shopping cart solution combines advanced scanning
          and payment technology with real-time product location assistance and
          data analytics capabilities. This enables customers to enjoy a
          seamless checkout experience while providing retailers with valuable
          insights to optimize operations and increase profitability.
          <br />
          <br />
          Whether you&#39;re a retailer looking to streamline your checkout
          process or a consumer seeking a more convenient and hassle-free
          shopping experience, CartEase has you covered. Join us on our journey
          to reshape the future of retail and make shopping simpler, smarter,
          and more enjoyable for everyone.
        </p>
        <img className="image" alt="Shopping Cart" src={image} />
      </div>
    </div>
  );
};
export default AboutUs;
