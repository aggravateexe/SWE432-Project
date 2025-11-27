const handleLogin = (app) => {
    app.get(["/", "/login"], (req, resp) => {
        const data = {
            title: "Login"
        }
        resp.render("login.ejs", data);
    });
};

const handleTest = (app) => {
    app.get("/test", (req, resp) => {
        const data = {
            title: "This is a Test!"
        }
        resp.render("test.ejs", data);
    });
};

const handleTimelineEditor = (app) => {
    app.get("/timeline", (req, resp) => {
        const data = {
            title: "Timeline Editor"
        }
        resp.render("timeline.ejs", data);
    });
};

const handleTimeSlotEditor = (app) => {
    app.get("/timeslot", (req, resp) => {
        const data = {
            title: "Time Slot Editor",
            id: req.query.id
        }
        resp.render("timeslot.ejs", data);
    });
}

const handlePlaylistEditor = (app) => {
    app.get("/playlist", (req, resp) => {
        const data = {
            title: "Playlist Editor",
            id: req.query.id
        }
        resp.render("playlist.ejs", data);
    });
}

module.exports = {
    handleLogin,
    handleTest,
    handleTimelineEditor,
    handleTimeSlotEditor,
    handlePlaylistEditor
}