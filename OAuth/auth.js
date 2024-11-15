const jwt=require("jsonwebtoken");
const { options } = require("../router/addProduct");
const { parseConnectionUrl } = require("nodemailer/lib/shared");

// SIGN THE TOKEN
function setUser(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  // Sign the token using a secret key
  return jwt.sign(payload, process.env.SECRET_KEY);
}


function getUser(token) {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded; // This should be your user payload
  } catch (e) {
    console.error("Token verification failed:", e.message);
    return null;
  }
}


async function checkJWTAuthentication(req, res, next) {
  console.log("Middleware called");

  const tokenCookie =  await req.cookies.userToken;
  console.log("Token from cookie:", tokenCookie);

  if (!tokenCookie) {
    console.log("No token found");
    return res.status(401).json({ error: "Authentication token missing" });
  }

  const user = getUser(tokenCookie);
  console.log("Decoded User:", user);

  if (!user) {
    console.log("User verification failed");
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.user = user;
  console.log("User set on req:", req.user);
  next();
}
module.exports = {
  setUser,
  getUser,
  checkJWTAuthentication,
};
