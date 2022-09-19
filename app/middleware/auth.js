const jwt = require("jsonwebtoken");

const verifyString = "test34derwrsd-sdfrtfssdfgrrt-otp42ert5t";

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["token"];

  if(!token) {
    return res.status(403).send({ 
      message: "A token is required"
    })
  }

  try {
    const decoded = jwt.verify(token, verifyString);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
  return next();
}

module.exports = verifyToken;
