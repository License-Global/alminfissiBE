const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Define your secret key
const secretKey = "segreto";

// Route to verify JWT token
router.post("/", (req, res) => {
  // Get the token from the request body
  const { token } = req.body;

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, secretKey);
    // Token is valid, you can perform further actions here
    // For example, you can access the decoded data like decoded.userId

    // Send a success response
    res.status(200).json({ message: "Token verified successfully" });
  } catch (error) {
    // Token verification failed
    // You can handle the error here

    // Send an error response
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
