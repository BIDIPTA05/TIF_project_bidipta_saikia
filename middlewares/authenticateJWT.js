const jwt = require("jsonwebtoken");

const authenticateJWT = () => async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing Token" });
  }

  jwt.verify(token, "secret_key", async (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden - Invalid Token" });
    } else {
      req.user = decoded;
      next();
    }
  });
};

module.exports = authenticateJWT;
