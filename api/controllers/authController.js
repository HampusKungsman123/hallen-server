const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found - Please check that you have the right credentials!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials - Check your password" });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const usertoReturn = {
      name: user.name,
      email: user.email,
      _id: user._id,
      role: user.role,
      token,
    };

    res.status(200).json({ message: "Login successful", user: usertoReturn });
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists - Use a different email address" });
    }

    const encryptedPassword = await bcrypt.hash(password, 12);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password should be at least 8 characters long" });
    }

    if (name.length < 3) {
      return res.status(400).json({ message: "Name should be at least 3 characters long" });
    }

    const newUser = new User({
      name,
      email,
      password: encryptedPassword,
    });

    const user = await newUser.save();

    res.status(201).json({ message: "User created successfuly", user });
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { login, register };
