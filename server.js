// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");

// const app = express();
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );
// app.use(bodyParser.json());

// // Create a Nodemailer transporter using Gmail or your email service
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "capstone162tiet@gmail.com", // replace with your email
//     pass: "lunw ijhb yjjv lafd", // replace with your email password or app-specific password
//   },
// });

// app.post("/send-email", (req, res) => {
//   const { email, message, isHtml } = req.body;

//   // Define the email options
//   const mailOptions = {
//     from: "capstone162tiet@gmail.com", // replace with your email
//     to: email,
//     subject: "Your Cart Details and Bill",
//     html: isHtml ? message : null, // Set HTML content if it's HTML
//     text: !isHtml ? message : null, // Fallback to plain text if not HTML
//   };

//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email:", error);
//       res.status(500).send("Failed to send email.");
//     } else {
//       console.log("Email sent:", info.response);
//       res.send(`Email sent to ${email}`);
//     }
//   });
// });

// app.listen(3001, () => {
//   console.log("Server is running on port 3001");
// });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

// Configure CORS to allow necessary methods, headers, and origin
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only this origin
    methods: ["GET", "POST", "OPTIONS"], // Allow these methods
    allowedHeaders: ["Content-Type"], // Allow necessary headers
  })
);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route for sending an email
app.post("/send-email", (req, res) => {
  const { email, message, isHtml } = req.body;

  // Email sending logic
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "capstone162tiet@gmail.com", //process.env.EMAIL_USER, //
      pass: "lunw ijhb yjjv lafd", //process.env.EMAIL_PASS, //, // Use environment variables in production
    },
  });

  const mailOptions = {
    from: "capstone162tiet@gmail.com",
    to: email,
    subject: "Your Cart Details",
    html: isHtml ? message : "",
    text: !isHtml ? message : "",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error sending email");
    }
    res.status(200).send("Email sent successfully");
  });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
