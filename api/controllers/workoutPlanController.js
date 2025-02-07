const WorkoutPlan = require("../models/workoutPlanModel");

const createWorkoutPlan = async (req, res) => {

    const { name, description, exercises } = req.body;
    
    try {
        
        const workoutPlan = await WorkoutPlan.create({
            name,
            description,
            exercises,
            user: "test",
        });

        res.status(201).json({ workoutPlan });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllWorkoutPlans = async (req, res) => {
    try {
        const workoutPlans = await WorkoutPlan.find().populate("user", "name");
        res.status(200).json({ workoutPlans });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteWorkoutPlan = async (req, res) => {
    const { id: userId } = req.user;
    const { id: workoutPlanId } = req.params;

    try {
        const workoutPlan = await WorkoutPlan.findById(workoutPlanId);

        if (!workoutPlan) {
            return res.status(404).json({ message: "Workout plan not found!" });
        }

        if (workoutPlan.user.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this workout plan!" });
        }

        await workoutPlan.remove();
        res.status(200).json({ message: "Workout plan deleted successfully!" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateWorkoutPlan = async (req, res) => {
    const { id: userId } = req.user;
    const { id: workoutPlanId } = req.params;
    const { name, description, exercises } = req.body;

    try {
        const workoutPlan = await WorkoutPlan.findById(workoutPlanId);

        if (!workoutPlan) {
            return res.status(404).json({ message: "Workout plan not found!" });
        }

        if (workoutPlan.user.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to update this workout plan!" });
        }

        workoutPlan.name = name;
        workoutPlan.description = description;
        workoutPlan.exercises = exercises;

        await workoutPlan.save();
        res.status(200).json({ message: "Workout plan updated successfully!" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createWorkoutPlan,
    getAllWorkoutPlans,
    deleteWorkoutPlan,
    updateWorkoutPlan,
}