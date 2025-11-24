const mongoose = require("mongoose");
const timeslotSchema = new mongoose.Schema({
    date: String,
    startTime: String,
    endTime: String,
    dj: String
});

module.exports = mongoose.model("TimeSlot", timeslotSchema, "timeslots");