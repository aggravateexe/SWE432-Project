const TimeSlot = require("../models/TimeSlot");
const mongoose = require("mongoose");

// GET handlers

const handleAllDJs = (app, DJs) => {
    app.get("/api/djs", (req, resp) => {
        DJs.distinct("dj")
            .then(data => {
                resp.json(data);
            })
            .catch(err => {
                resp.json({message : "Unable to connect to djs!"})
            });
    });
}

const handleAllTimeSlots = (app, TimeSlot) => {
    app.get("/api/timeslots", (req, resp) => {
        TimeSlot.find({})
                .then(data => {
                    resp.json(data);
                })
                .catch(err => {
                    resp.json({message : "Unable to connect to time slots"});
                });
    });
};

const handleTimeSlotsByDJ = (app, TimeSlot) => {
    app.get("/api/timeslots/dj/:dj", (req, resp) => {
        TimeSlot.find({dj : req.params.dj})
                .then(data => {
                    resp.json(data);
                })
                .catch(err => {
                    resp.json({message : "Unable to connect to time slots"});
                });
    });
};

const handleTimeSlotsByDate = (app, TimeSlot) => {
    app.get("/api/timeslots/date/:date", (req, resp) => {
        TimeSlot.find({date : req.params.date})
                .then(data => {
                    resp.json(data);
                })
                .catch(err => {
                    resp.json({message : "Unable to connect to time slots"});
                });
    });
};

const handleTimeSlotsByID = (app, TimeSlot) => {
    app.get("/api/timeslots/id/:id", (req, resp) => {
        TimeSlot.findById(req.params.id)
            .then(data => {
                resp.json(data);
            })
            .catch(err => {
                resp.json({message : "Unable to connect to time slots!"});
            })
    });
}

// POST handlers

const handleCreateTimeSlot = (app, TimeSlot) => {
    app.route("/api/create/timeslot")
        .post((req, resp) => {
            // retrieve the form data from the http request
            const aTimeSlot = new TimeSlot({
                date: req.body.date,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                dj: req.body.dj
            });
            // now have mongoose add the timeslot data
            aTimeSlot.save()
                .then(data => {
                    resp.json({message: data});
                })
                .catch(err => {
                    resp.json({message: "Unable to send data to timeslots!"});
                });
        });
}
const handleCreateTimeSlotWithID = (app, TimeSlot) => {
    app.route("/api/create/timeslot/id/:id")
        .post((req, resp) => {
            // retrieve the form data from the http request
            const aTimeSlot = new TimeSlot({
                _id: new mongoose.Types.ObjectId(req.params.id),
                date: req.body.date,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                dj: req.body.dj,
                playlist: JSON.parse(req.body.playlist)
            });
            // now have mongoose add the timeslot data
            aTimeSlot.save()
                .then(data => {
                    resp.json({message: data});
                })
                .catch(err => {
                    resp.json({message: "Unable to send data to timeslots!"});
                });
        });
}

// PUT handlers

const handleUpdateTimeSlot = (app, TimeSlot) => {
    app.put("/api/update/timeslot/id/:id", (req, resp) => {

        console.log(typeof req.body.playlist);

        const aTimeSlot = {
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            dj: req.body.dj,
            playlist: req.body.playlist != undefined? JSON.parse(req.body.playlist): [],
        };

        console.log(aTimeSlot);
        TimeSlot.findByIdAndUpdate(req.params.id, aTimeSlot, {new: true, overwrite: true})
            .then(data => {
                resp.json({message: data})
            })
            .catch(err => {
                resp.json({message: "Unable to update data from timeslots!"});
            })
    });
}

// DELETE handlers

const handleDeleteTimeSlot = (app, TimeSlot) => {
    app.delete("/api/delete/timeslot/id/:id", (req, resp) => {
        TimeSlot.findByIdAndDelete(req.params.id)
            .then(data => {
                resp.json(data);
            })
            .catch(errno => {
                resp.json({message: "Unable to delete time slot!"});
            })
    });
}

module.exports = {
    handleAllDJs,
    handleAllTimeSlots,
    handleTimeSlotsByDJ,
    handleTimeSlotsByDate,
    handleTimeSlotsByID,
    handleCreateTimeSlot,
    handleCreateTimeSlotWithID,
    handleUpdateTimeSlot,
    handleDeleteTimeSlot
};