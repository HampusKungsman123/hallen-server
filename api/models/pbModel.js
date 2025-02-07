const mongoose = require("mongoose");

const pbSchema = new mongoose.Schema(
    {
        pb: [
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
            }
        ],
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", pbSchema);