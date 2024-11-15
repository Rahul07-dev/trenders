
const User = require("./schema/userSchema");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors=require("cors")
const { OAuth2Client } = require("google-auth-library"); // Ensure OAuth2Client is imported

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// Load environment variables
dotenv.config({ path: "./config.env" });

// Connect to the database
require("./db/connection");

// Setup routes
app.use(require("./router/addProduct"));
app.use(require("./router/editProduct"));
app.use(require("./router/deleteProduct"));
app.use(require("./router/sendEmail"));
app.use(require("./router/signup"));
app.use(require("./router/login"));
app.use(require("./router/logout"));
app.use(require("./router/forgotPassword"));
app.use(require("./router/userDetails"));
app.use(require("./router/addToCart"));
app.use(require("./router/addToWhilist"));
app.use(require("./router/getSearchedProducts"));
app.use(require("./router/selectedProductsDetails"));
app.use(require("./router/checkForPincode"));
app.use(require("./router/trendingAndSpecialOffers"));
app.use(require("./router/rateProduct"));
app.use(require("./router/getReviews"));
app.use(require("./router/addressInfo"));
app.use(require("./router/order"));
app.use(require("./router/getAllOrdersForAdmin"));
app.use(require("./router/deliverProduct"));
app.use(require("./router/generateOrderId"));

// Serve frontend
// app.use(express.static("./client/build"));
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });


// Initialize OAuth2Client with Google credentials
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);


app.post("/auth/google", async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: "ID Token is required" });
  }

  try {
    // Verify the ID Token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID, // Ensure it's the correct audience (your Google Client ID)
    });

    const userDetails = ticket.getPayload();
    console.log("Verified User:", userDetails);
    let user = await User.findOne({ email: userDetails.email});

    // If not, create a new user
    if (!user) {
      user = await new User({
        googleId: userDetails.sub,
        email: userDetails.email,
        name: userDetails.name,
      });
      await user.save();
    }

    const userToken = await user.generateToken();
    res.cookie("userToken", userToken, { httpOnly: true });
    res.status(200).json({ message: "Login successful", token: userToken });
  } catch (error) {
    console.error("Error verifying the token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
