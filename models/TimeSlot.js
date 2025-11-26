const mongoose = require("mongoose");
const timeslotSchema = new mongoose.Schema({
    date: String,
    startTime: String,
    endTime: String,
    dj: String,
    playlist: Array
});

module.exports = mongoose.model("TimeSlot", timeslotSchema, "timeslots");