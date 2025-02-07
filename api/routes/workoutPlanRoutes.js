const express = require("express");
const router = express.Router();
const workoutPlanController = require("../controllers/workoutPlanController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/",  workoutPlanController.createWorkoutPlan);
router.get("/", authMiddleware, workoutPlanController.getAllWorkoutPlans);
router.delete("/:id", authMiddleware, workoutPlanController.deleteWorkoutPlan);
router.patch("/:id", authMiddleware, workoutPlanController.updateWorkoutPlan);

module.exports = router;