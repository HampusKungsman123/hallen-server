const mongoose = require("mongoose");

const workoutPlanSchema = new mongoose.Schema(
    {
        title: {
        type: String,
        required: "Title is required to create a workout plan",
        },
        description: {
        type: String,
        required: [true, "Description is required to create a workout plan"],
        },
        exercises: [
            {
                exercise: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Exercise",
                },
                weight: {
                    type: Number,
                    default: 0,
                    required: "Weight is required to create an exercise",
                },
                sets: {
                    type: Number,
                    default: 0,
                    required: "Sets are required to create an exercise",
                },
                reps: {
                    type: Number,
                    default: 0,
                    required: "Reps are required to create an exercise",
                },
            }
        ],
        likes: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        },
        tags: {
            type: [String],
            default: [],
        },
        comments: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        },
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("WorkoutPlan", workoutPlanSchema);