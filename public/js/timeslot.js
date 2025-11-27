let slotID;
let date;
let startTime;
let endTime;
let dj;
let playlist;

document.addEventListener("DOMContentLoaded", () => {
    // getting passed id
    const params = new URLSearchParams(window.location.search);
    slotID = params.get("id");

    // initializing various page elements to use
    const btnPlaylist = document.getElementById("btnPlaylist");
    const btnDelete = document.getElementById("btnDelete");
    const form = document.forms["timeslotForm"];
    const dropDJ = form["dj"];
    const lblDate = document.getElementById("date");
    const lblStartTime = document.getElementById("startTime");
    const lblEndTime = document.getElementById("endTime");

    // adding event listners
    btnPlaylist.addEventListener("click", onClick);
    btnDelete.addEventListener("click", onClick);
    form.addEventListener("submit", event => {
        event.preventDefault();

        let dj = dropDJ.value;

        if (dj == ""){
            alert("Please select a DJ!");
            return false;
        }

        let formData = new FormData();
        formData.append("date", date);
        formData.append("startTime", startTime);
        formData.append("endTime", endTime);
        formData.append("dj", dj);
        //formData.append("playlist", playlist);
        let data = new URLSearchParams(formData);

        fetch(`/api/update/timeslot/id/${slotID}`, {
            method: "PUT",
            headers: {"Content-Type" : "application/x-www-form-urlencoded"},
            body: data
        })
        .then(resp => {
            if(resp.ok){
                return resp.json();
            } else {
                throw new Error(`${resp.status} ERROR!`);
            }
        })
        .then(data => {
            console.log(data);
            window.location.reload();
        })
        .catch(error => {
            console.log("Unable to create time slot!");
        });
        return true;
    });

    // setting up drop down of djs
    fetch("/api/djs")
        .then(resp => resp.json())
        .then(data => {
            data.forEach(dj => {
                let option = document.createElement("option");
                option.setAttribute("value", dj);
                option.textContent = dj;
                dropDJ.append(option);
            });
        })
        .catch(error => console.log("Unable to fetch data for DJs!"));
    
    // setting up page values to the time slot with passed id.
    fetch(`/api/timeslots/id/${slotID}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);

            date = data.date;
            startTime = data.startTime;
            endTime = data.endTime;
            dj = data.dj;
            // playlist = data.playlist;

            lblDate.textContent = date;
            lblStartTime.textContent = startTime;
            lblEndTime.textContent = endTime;
            dropDJ.value = dj;
        })
        .catch(error => console.log("Unable to fetch timeslot!"));
});

function onClick(event){
    let id = event.target.id;
    console.log(`Pressed ${id} button!`);
    
    if(id == "btnPlaylist"){
        window.location.href = `/playlist?id=${slotID}`;
    }
    else if (id == "btnDelete"){
        let input = confirm("Are you sure you want to delete this time slot?");

        if(input){
            console.log("Deleting timeslot!");
            fetch(`/api/delete/timeslot/id/${slotID}`, { method: "DELETE" })
                .then(resp => resp.json())
                .then(data => {
                    console.log(data);
                    window.location.href = "timeline.html";
                })
                .catch(error => console.log("Unable to delete this timeslot!"));

        }else{
            console.log("Canceled timeslot deletion!");
        }
    }
}