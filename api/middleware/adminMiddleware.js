const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized - You need to be an admin to perform this action!" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
