class PlaylistEntry{
    constructor(index, name="", artist="", duration="00:00", genre="", img=""){
        // setting up values
        this.index = index;
        this.name = name;
        this.artist = artist;
        this.duration = duration;
        this.genre = genre;
        this.img = img;

        // setting up html elements
        this.createView(index, name, artist, duration, genre, img)
        this.setIndexes(index);
    }

    createView(){
        this.view = document.createElement("div");
        this.view.className = "playlistEntry"

        // Setting up song name element
        this.viewName = document.createElement("input");
        this.viewName.type = "text";
        this.viewName.placeholder = "Song Name";
        this.viewName.value = this.name;

        // Setting up artist name element
        let songArtist = document.createElement("div")
        songArtist.className = "songArtist";

        let labelForArtist = document.createElement("label")
        labelForArtist.textContent = "By: ";

        this.viewArtist = document.createElement("label");
        this.viewArtist.textContent = this.artist;

        songArtist.append(labelForArtist);
        songArtist.append(this.viewArtist);

        // Setting up duration element.
        let SongDuration = document.createElement("div");
        SongDuration.className = "songDuration";

        let labelforDuration = document.createElement("label");
        labelforDuration.textContent = "Duration: ";

        this.viewDuration = document.createElement("label");
        this.viewDuration.textContent = this.duration;

        SongDuration.append(labelforDuration);
        SongDuration.append(this.viewDuration);

        // Aetting up buttons
        let btns = document.createElement("div");
        btns.className = "btns";

        this.btnDELETE = document.createElement("button");
    
        this.btnDELETE.className = "btnDELETE";
        this.btnDELETE.textContent = "X";
        this.btnDELETE.setAttribute("data-id", "delete");
        this.btnDELETE.addEventListener("click", entryOnClick);

        let btnsMove = document.createElement("div");
        btnsMove.className = "btnsMove";

        this.btnUP = document.createElement("button");
        this.btnUP.className = "btnUP";
        this.btnUP.textContent = "^";
        this.btnUP.setAttribute("data-id", "up");
        this.btnUP.addEventListener("click", entryOnClick);

        this.btnDOWN = document.createElement("button");
        this.btnDOWN.className = "btnDOWN";
        this.btnDOWN.textContent = "v";
        this.btnDOWN.setAttribute("data-id", "down");
        this.btnDOWN.addEventListener("click", entryOnClick);

        btnsMove.append(this.btnUP);
        btnsMove.append(this.btnDOWN);
        btns.append(this.btnDELETE);
        btns.append(btnsMove);

        // Appending everying to parent element
        this.view.append(this.viewName);
        this.view.append(songArtist);
        this.view.append(SongDuration);
        this.view.append(btns);

        return this.view;
    }
    
    setIndexes(index){
        this.index = index;
        this.view.setAttribute("data-index", index);
        this.btnUP.setAttribute("data-index", index);
        this.btnDOWN.setAttribute("data-index", index);
        this.btnDELETE.setAttribute("data-index", index);
    }
}