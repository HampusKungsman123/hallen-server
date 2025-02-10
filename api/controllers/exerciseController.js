const Exercise = require("../models/exerciseModel");

const createExercise = async (req, res) => {
    const { title, description } = req.body;

    try {
        const exercise = await Exercise.create({
            title,
            description,
        });

        res.status(201).json({ exercise });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.status(200).json({ exercises });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteExercise = async (req, res) => {
    const { id: exerciseId } = req.params;

    try {
        const exercise = await Exercise.findById(exerciseId);

        if (!exercise) {
            return res.status(404).json({ message: "Exercise not found!" });
        }

        await exercise.remove();
        res.status(200).json({ message: "Exercise deleted successfully!" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createExercise,
    getAllExercises,
    deleteExercise,
};