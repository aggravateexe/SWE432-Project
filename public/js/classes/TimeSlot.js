class TimeSlot{
    constructor(time, occupied, dj="Blank Time Slot"){
        this.time = time;
        this.occupied = occupied;
        this.dj = dj;
        this.createView();
    }
    
    createView(){
        this.view = document.createElement("div");
        this.view.setAttribute("class", "timeslot");

        this.viewTime = document.createElement("p");
        this.viewTime.textContent = this.time;

        this.button = document.createElement("button");
        this.button.type = "button";
        this.button.textContent = this.dj
        this.button.style.visibility="hidden";
        this.button.addEventListener("click", onClick);

        this.view.append(this.viewTime);
        this.view.append(this.button);

        return this.view;
    }

    claim(id, color, date, startTime, endTime, dj = "Blank Time Slot"){
        this.id = id;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.dj = dj;
        this.color = color;
        this.occupied = true;

        this.button.setAttribute("data-id", id);
        this.button.style.backgroundColor = color;
        this.button.style.visibility = "visible";
        this.button.textContent = `DJ "${dj}"`;
    }
}

function onClick(event){
    let id = event.target.dataset.id;
    window.location.href = `timeslot.html?id=${id}`;
}