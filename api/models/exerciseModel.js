const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
    {
        title: {
        type: String,
        required: "Title is required to create an exercise",
        },
        description: {
        type: String,
        required: [true, "Description is required to create an exercise"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Exercise", exerciseSchema);