const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const passwordRegex = /^(?=.*[A-Z])(?=.*[\W]).{8,}$/;

// > Update a user
const updateUser = async (req, res) => {
  const userToUpdate = await User.findById(req.params.id);

  if (!userToUpdate) {
    return res.status(404).json({ message: "User not found!" });
  }

  const { name, email, password, profilePicture } = req.body;


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
  const encryptedPassword = await bcrypt.hash(password, 12);

  userToUpdate.name = name || userToUpdate.name;
  userToUpdate.email = email || userToUpdate.email;
  userToUpdate.password = encryptedPassword || userToUpdate.password;
  userToUpdate.profilePicture = profilePicture || userToUpdate.profilePicture;

  try {
    const updatedUser = await userToUpdate.save();
    res.status(200).json({
      message: "User updated successfully!"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
    const users = await User.find().populate("followers").populate("following");

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found!" });
    }

    return res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const followUser = async (req, res) => {
  const { id: userId } = req.user;
  const { targetUserId } = req.body;

  if (userId === targetUserId) {
    return res.status(400).json({ message: "You cannot follow yourself." });
  }

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User to follow not found." });
    }

    if (user.following.includes(targetUserId)) {
      return res.status(400).json({ message: "You already follow this user." });
    }

    user.following.push(targetUserId);
    targetUser.followers.push(userId);

    await user.save();
    await targetUser.save();

    res.status(200).json({ message: "User followed successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unfollowUser = async (req, res) => {
  const { id: userId } = req.user;

  const { targetUserId } = req.body;

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User to unfollow not found." });
    }

    if (!user.following.includes(targetUserId)) {
      return res.status(400).json({ message: "You do not follow this user." });
    }

    user.following = user.following.filter((id) => id.toString() !== targetUserId.toString());
    targetUser.followers = targetUser.followers.filter((id) => id.toString() !== userId.toString());

    await user.save();
    await targetUser.save();

    res.status(200).json({ message: "User unfollowed successfully." });
  } catch (error) {
    console.error("Unfollow Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const friends = user.following.filter((id) => user.followers.includes(id));

    const friendDetails = await User.find({ _id: { $in: friends } }).select(
      "id name profilePicture"
    );

    res.json(friendDetails);
  } catch (err) {
    console.error("Error fetching friends:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// * Get a user by id
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate("followers").populate("following");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  followUser,
  unfollowUser,
  getFriends,
};
