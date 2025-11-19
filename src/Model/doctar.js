const mongoose = require("mongoose");
const {Schema} = mongoose;

const doctarSchema = new Schema({
    patientId: {
        type: Number,
        required: [true, "patientId is required"],
    },
    date: {
        type: Date,
        required: [true, "date is required"]
    },
    time: {
        type: String,
        required: [true, "time is required"],
        match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, // HH:MM format
    },
    reason: {
        type: String,
        required: [true, "reason is required"],
        maxLength: [100, "Maximum 100 character allowed"]
    },
    role: {
        type: String, 
        enum: ["doctar", "patient"], 
        required: true,
    }
});

module.exports = mongoose.model("doctarModel", doctarSchema)
