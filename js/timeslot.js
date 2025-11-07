document.addEventListener("DOMContentLoaded", () => {
    let btnPlaylist = document.getElementById("btnPlaylist");
    btnPlaylist.disabled = true;
    btnPlaylist.addEventListener("click", onClick);

    let btnDelete = document.getElementById("btnDelete");
    btnDelete.addEventListener("click", onClick);

    let dropDJ = document.getElementById("dropDJ");
    dropDJ.value = "";
    dropDJ.addEventListener("change", event => {
        let dj = dropDJ.value;
        if(dj != ""){
            btnPlaylist.disabled = false;
        }
    })

    let form = document.forms["timeslotForm"];
    form.action = "timeline.html";
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