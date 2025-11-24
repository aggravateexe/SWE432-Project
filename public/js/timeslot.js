document.addEventListener("DOMContentLoaded", () => {
    // getting passed id
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

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
        alert(`Saving time slot for DJ ${dj}!`);
        window.location.href = "timeline.html";
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
    fetch(`/api/timeslots/id/${id}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            lblDate.textContent = data.date;
            lblStartTime.textContent = data.startTime;
            lblEndTime.textContent = data.endTime;
        })
        .catch(error => console.log("Unable to fetch timeslot!"));
});

function onClick(event){
    let id = event.target.id;
    console.log(`Pressed ${id} button!`);
    
    if(id == "btnPlaylist"){
        window.location.href = "playlist.html";
    }
    else if (id == "btnDelete"){
        let input = confirm("Are you sure you want to delete this time slot?");

        if(input){
            console.log("Deleting timeslot!");
            window.location.href = "timeline.html";
        }else{
            console.log("Canceled timeslot deletion!");
        }
    }
}