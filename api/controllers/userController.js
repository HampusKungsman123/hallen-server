const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const passwordRegex = /^(?=.*[A-Z])(?=.*[\W]).{8,}$/;

// > Create a new user
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !name.length) {
    return res.status(400).json({ message: "Name cannot be empty" });
  }

  if (!email || !email.length) {
    return res.status(400).json({ message: "Email cannot be empty" });
  }

  // check if the password is valid
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must contain at least 8 characters, one uppercase letter and one special character",
    });
  }

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password cannot be empty or less than 8 characthers!" });
  }

  // check if the user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists!" });
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User created successfully!",
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// > Update a user
const updateUser = async (req, res) => {};

// ! Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userToDelete = await User.findById(id);

    if (!userToDelete) {
      return res.status(404).json({ message: "User not found!" });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// * Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found!" });
    }

    return res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// * Get a user by id
const getUserById = async (req, res) => {};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
