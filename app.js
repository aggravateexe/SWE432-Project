require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");

// Setting up app
const app = express();

require("./handlers/dataConnector.js").connect();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));

app.get("/", (req, resp) => {
    resp.sendFile(path.join(__dirname, "public", "login.html"));
});

// Getting schemas
const TimeSlot = require("./models/TimeSlot.js");

// Retrieving time slots from the database.
const timeslotRouter = require("./handlers/timeslotRouter.js");
timeslotRouter.handleAllDJs(app, TimeSlot);
timeslotRouter.handleAllTimeSlots(app, TimeSlot);
timeslotRouter.handleTimeSlotsByDJ(app, TimeSlot);
timeslotRouter.handleTimeSlotsByDate(app, TimeSlot);
timeslotRouter.handleTimeSlotsByID(app, TimeSlot);

// Sending time slots to the database
timeslotRouter.handleCreateTimeSlot(app, TimeSlot);


// Setting up app to listen
app.listen(process.env.PORT, () => {
    console.log("App is listening on port=" + process.env.PORT);
});