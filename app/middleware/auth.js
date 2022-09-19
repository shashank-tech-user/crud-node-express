const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["token"];

  if(!token) {
    return res.status(403).send({ 
      message: "A token is required"
    })
  }

  try {
    let newToken = token.split("Bearer ")[1];
    const decoded = jwt.verify(newToken, process.env.JWT_SECRET_KEY);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
  return next();
}

module.exports = verifyToken;
