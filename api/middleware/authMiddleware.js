const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Access denied. Invalid token format." });
    return;
  }

  const token = authHeader.split(" ")[1];
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Auth Error - Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(500).send({ message: "Invalid Token" });
  }
};
