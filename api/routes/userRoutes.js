const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// > create a new user - POST > /api/users
router.post("/", authMiddleware, adminMiddleware, userController.createUser);
router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers);
router.delete("/:id", authMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;
