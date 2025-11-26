let slotID;
let date;
let startTime;
let endTime;
let dj;
let playlist = Array();

document.addEventListener("DOMContentLoaded", ()=>{
    // getting passed id
    const params = new URLSearchParams(window.location.search);
    slotID = params.get("id");

    // initializing page elements
    let btnAddSong = document.getElementById("btnAddSong");
    btnAddSong.addEventListener("click", onClick);

    let btnSave = document.getElementById("btnSave");
    btnSave.addEventListener("click", onClick);

    // Fetching playlist from timeslot
    fetch(`/api/timeslots/id/${slotID}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            date = data.date;
            startTime = data.startTime;
            endTime = data.endTime;
            dj = data.dj;
            
            data.playlist.forEach(e => {
                addEntries(e.name, e.artist, e.duration, e.genre, e.img);
            })
        })
        .catch(error => console.log("Unable to fetch timeslot!"));
});

function onClick(event){
    let id = event.target.id;
    console.log(`Pressed ${id} button!`);

    if(id == "btnAddSong"){
        addEntries();
    }
    else if (id == "btnSave"){
        let temp = new Array();
        playlist.forEach(e => {
            e.name = e.viewName.value;

            let data = {
                name: e.name,
                artist: e.artist,
                duration: e.duration,
                genre: e.genre,
                img: e.img,
            }

            temp.push(data);
        });

        console.log(temp);

        let formData = new FormData();
        formData.append("date", date);
        formData.append("startTime", startTime);
        formData.append("endTime", endTime);
        formData.append("dj", dj);
        formData.append("playlist", JSON.stringify(temp));

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
    }
}

function entryOnClick(event){
    const btn = event.target;
    const id = btn.dataset.id;
    const index = parseInt(btn.dataset.index);
    const entry = playlist[index];

    if (id == "up" && index > 0){
        swapEntries(index, index - 1);
        renderEntries();
    }
    else if (id == "down" && index < playlist.length-1){
        swapEntries(index, index + 1);
        renderEntries();
    }
    else if (id == "delete"){
        entry.view.remove();
        let temp = new Array();
        playlist.forEach(e => {
            if(e === entry){
                return;
            }
            e.setIndexes(temp.length);
            temp.push(e);
        })
        playlist = temp;
    }
}

function addEntries(name, artist, duration, genre, img){
    const playlistView = document.getElementById("playlistEntries");
    let entry = new PlaylistEntry(playlist.length, name, artist, duration, genre, img);
    playlist.push(entry);
    playlistView.append(entry.view);
}

function swapEntries(indexA, indexB){
    const a = playlist[indexA];
    const b = playlist[indexB];

    a.setIndexes(indexB)
    b.setIndexes(indexA);

    playlist[indexB] = a;
    playlist[indexA] = b;
}

function renderEntries(){
    const playlistView = document.getElementById("playlistEntries");
    playlistView.innerHMTL = "";
    playlist.forEach(e => playlistView.append(e.view));
}