const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuitarSchema = new Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: Number,
    condition: {
        type: String,
        required: true,
        enum: ["mint", "good", "fair", "poor"]
    },
    type: {
        type: String,
        required: true,
        enum: ["acoustic", "electric", "acoustic-electric"]
    }
});

module.exports = mongoose.model("Guitar", GuitarSchema);