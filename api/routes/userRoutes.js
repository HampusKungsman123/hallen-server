const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers);
router.delete("/:id", authMiddleware, adminMiddleware, userController.deleteUser);
router.patch("/:id", authMiddleware, adminMiddleware, userController.updateUser);

module.exports = router;
