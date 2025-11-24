document.addEventListener("DOMContentLoaded", ()=>{
    let btnAddSong = document.getElementById("btnAddSong");
    btnAddSong.addEventListener("click", onClick);

    let btnSave = document.getElementById("btnSave");
    btnSave.addEventListener("click", onClick);
});

function onClick(event){
    let id = event.target.id;
    console.log(`Pressed ${id} button!`);

    if(id == "btnAddSong"){
        addEntries();
    }
    else if (id == "btnSave"){
        alert("Playlist saved!");
        window.location.href = "timeslot.html";
    }
}

function createPlaylistEntry(){
    let entry = document.createElement("div");
    entry.className = "playlistEntry"

    let songName = document.createElement("input");
    songName.type = "text";
    songName.placeholder = "Song Name";

    let SongDuration = document.createElement("div");
    SongDuration.className = "songDuration";

    let labelforDuration = document.createElement("label");
    labelforDuration.textContent = "Duration: ";

    let labelDuration = document.createElement("label");
    labelDuration.textContent = "00:00";

    SongDuration.append(labelforDuration);
    SongDuration.append(labelDuration);

    let btns = document.createElement("div");
    btns.className = "btns";

    let btnDELETE = document.createElement("button");
    btnDELETE.className = "btnDELETE";
    btnDELETE.textContent = "X";
    btnDELETE.addEventListener("click", event => {
       entry.remove(); 
    });

    let btnsMove = document.createElement("div");
    btnsMove.className = "btnsMove";

    let btnUP = document.createElement("button");
    btnUP.className = "btnUP";
    btnUP.textContent = "^";

    let btnDOWN = document.createElement("button");
    btnDOWN.className = "btnDOWN";
    btnDOWN.textContent = "v";

    btnsMove.append(btnUP);
    btnsMove.append(btnDOWN);
    btns.append(btnDELETE);
    btns.append(btnsMove);

    entry.append(songName);
    entry.append(SongDuration);
    entry.append(btns);

    return entry;
}

function addEntries(num = 1){
    let playlistView = document.getElementById("playlistEntries");
    for (let i = 0; i < num; i++){
        playlistView.append(createPlaylistEntry());
    }
}