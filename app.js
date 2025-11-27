require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");

// Setting up app
const app = express();

require("./handlers/dataConnector.js").connect();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get(["/", "/login"], (req, resp) => {
    const data = {
        title: "Login"
    }
    resp.render("login.ejs", data);
});

app.get("/test", (req, resp) => {
    const data = {
        title: "This is a Test!"
    }
    resp.render("test.ejs", data);
});

app.get("/timeline", (req, resp) => {
    const data = {
        title: "Timeline Editor"
    }
    resp.render("timeline.ejs", data);
});

app.get("/timeslot", (req, resp) => {
    const data = {
        title: "Time Slot Editor",
        id: req.query.id
    }
    resp.render("timeslot.ejs", data);
});

app.get("/playlist", (req, resp) => {
    const data = {
        title: "Playlist Editor",
        id: req.query.id
    }
    resp.render("playlist.ejs", data);
});
/*
app.get("/", (req, resp) => {
    resp.sendFile(path.join(__dirname, "public", "login.html"));
});
*/

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
timeslotRouter.handleCreateTimeSlotWithID(app, TimeSlot);

// Updating time slots to the database
timeslotRouter.handleUpdateTimeSlot(app, TimeSlot);

// Deleting time slots from database
timeslotRouter.handleDeleteTimeSlot(app, TimeSlot);


// Setting up app to listen
app.listen(process.env.PORT, () => {
    console.log("App is listening on port=" + process.env.PORT);
});