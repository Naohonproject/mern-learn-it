const jwt = require("jsonwebtoken");

// define middleware function to verify the routes that is private
const verifyToken = (req, res, next) => {
  // take authorization from header
  const authHeader = req.header("Authorization");
  //if request includes Authorization in header, take the token from that
  const token = authHeader && authHeader.split(" ")[1];
  // check, if there is no token, return the response with error status and message
  if (!token) {
    return (
      res
        //   401 means un-authorized
        .status(401)
        .json({ success: false, message: "Access token not found" })
    );
  }
  // if exists token, verify that to decode the token.Take the pay load includes user information
  // this verify function just be ok if we pass to it right access_token_secret that
  // we was publishing
  try {
    //   if token invalid, this verify function will throw an error, we will catch it
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //   if decoded successfully, assign that userId(user information) to the req object
    //   then call next function to let the req go to next middleware, means that
    //   we authenticated user
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    //   403 means forbidden
    res.status(403).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = verifyToken;
