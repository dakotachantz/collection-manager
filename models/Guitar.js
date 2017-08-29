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
    body: {
        electric: {
            type: String,
            enum: ["solid-body", "semi-hollow", "hollow"]
        },
        acoustic: {
            type: String,
            enum: ["dreadnought", "auditorium", "grand-auditorium", "classical"]
        }
    },
    year: Number,
    condition: {
        type: String,
        required: true,
        enum: ["mint", "good", "fair", "poor"]
    },
    strings: Number

});

module.exports = mongoose.model("Guitar", GuitarSchema);
