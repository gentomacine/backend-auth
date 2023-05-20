import { obtainTokenFromHeader } from "../utils/obtaintokenfromheader.js";
import { verifytoken } from "../utils/verifytoken.js";

export const isLogin = (req, res, next) => {
  // Get token from header
  const token = obtainTokenFromHeader(req);
  
  // Verify token and obtain user ID
  const userDecoded = verifytoken(token);
  
  // Check if userDecoded exists and assign user ID to userAuth
  if (!userDecoded) {
    return res.json({
      status: "error",
      message: "Kindly, login because it seems the token is expired or invalid"
    });
  } else {
    req.userAuth = userDecoded.id; // Assign user ID to userAuth
    next();
  }
};
