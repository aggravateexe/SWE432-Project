const hours = getHours();
const timeSlots = Array();

class TimeSlot{
    constructor(id, date, startTime, endTime, dj, slot, button){
        this.id = id;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.dj = dj;
        this.slot = slot;
        this.button = button;
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    fillTimeDropDown("dropStart");
    fillTimeDropDown("dropEnd");

    let dateForm = document.forms["dateForm"];

    let inDate = dateForm["date"];
    inDate.addEventListener("change", event => {
        console.log(inDate.value);
        console.log(typeof inDate.value);
        fillTimelineView();
        getTimeSlotsFromDB(inDate.value)
    });

    let currDate = new Date();
    currDate = new Date(currDate.toLocaleDateString("en-US", "American/NewYork"))

    inDate.valueAsDate = currDate;
    inDate.dispatchEvent(new Event("change"));

    let btnRight = dateForm["right"];
    let btnLeft = dateForm["left"];
    btnRight.textContent = ">";
    btnLeft.textContent = "<";

    simpleDateChange = event => {
        let dateBack = inDate.valueAsDate;
        let offset = event.target.id == "btnLeft" ? -1 : 1
        dateBack.setDate(dateBack.getDate() + offset);
        inDate.valueAsDate = dateBack;
        inDate.dispatchEvent(new Event("change"));
    };

    btnLeft.addEventListener("click", simpleDateChange);
    btnRight.addEventListener("click", simpleDateChange);

    dateForm.addEventListener("submit", event => {
        event.preventDefault();
        return true;
    });

    let form = document.forms["timelineForm"];

    form.addEventListener("submit", event => {
        event.preventDefault();

        let inDateHidden = form["date"];
        inDateHidden.valueAsDate = inDate.valueAsDate;

        let date = inDateHidden.value;
        let startTime = form["startTime"].value;
        let endTime = form["endTime"].value;
        let dj = form["dropDJ"].value;        

        let slots = claimTimeSlots(null, date, startTime, endTime, dj)
        if(slots === null){
            return false;
        };

        //let formData = new FormData(form);
        let formData = new FormData();
        formData.append("date", date);
        formData.append("startTime", startTime);
        formData.append("endTime", endTime);
        formData.append("dj", dj);
        let data = new URLSearchParams(formData);
        
        fetch("/api/create/timeslot", {
            method: "post",
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
            slots.forEach(slot => {
                slot.setAttribute("data-id", data.message._id);
                let btn = slot.getElementsByTagName("button")[0];
                btn.setAttribute("data-id", data.message._id);
            });
        })
        .catch(error => {
            console.log("Unable to create time slot!");
        });

        return true;
    });

    // Fetching DJs from database!
    let dropDJ = form["dj"];

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
});

function getTimeSlotsFromDB(date){
    fetch(`/api/timeslots/date/${date}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            data.forEach(slot => {
                let id = slot._id;
                let date = slot.date;
                let startTime = slot.startTime;
                let endTime = slot.endTime;
                let dj = slot.dj;

                claimTimeSlots(id, date, startTime, endTime, dj);
            });
        })
        .catch(error => console.log("Unable to fetch data for time slots!"));
}

function claimTimeSlots(id, date, startTime, endTime, dj = "Blank Time Slot"){
    startID = hours.indexOf(startTime);
    endID = hours.indexOf(endTime);

    // validating start and end times.
    if(startID == endID){
        console.log(`${startTime}: ${startID}, ${endTime}: ${endID}`);
        alert("Start and End times MUST be different!");
        return null;
    }
    else if(endID < startID){
        alert("Start time MUST be before End time!");
        return null;
    }

    // Selecting slots
    let slots = Array();
    for(let i = startID; i < endID; i++){
        slots.push(timeSlots[i]);
    }

    // Ensuring slots are not already claimed
    let occupiedSlots = slots.filter(slot => parseInt(slot.dataset.occupied) > 0);

    if(occupiedSlots.length > 0){
        let times = occupiedSlots.map(slot => slot.dataset.time);
        times = times.join(", ");
        alert(`The Time Slot(s): ${times}, are already taken!`);
        return null;
    }

    // Claiming slots
    let color = randomColor();
    slots.forEach(slot => {
        slot.setAttribute("data-occupied", 1);
        slot.setAttribute("data-id", id);
        slot.setAttribute("data-date", date);
        slot.setAttribute("data-startTime", startTime);
        slot.setAttribute("data-endTime", endTime);
        slot.setAttribute("data-dj", dj);
        let button = slot.getElementsByTagName("button")[0];
        button.setAttribute("data-id", id);
        button.style.backgroundColor = color;
        button.style.visibility = "visible";
        button.textContent = `DJ "${dj}"`;
    });

    //console.log(`Added DJ ${dj} to play from ${startTime} to ${endTime}!`);
    return slots;
}

function createTimeSlot(){
    let timeSlot = document.createElement("div");
    timeSlot.setAttribute("class", "timeslot");
    timeSlot.append(document.createElement("p"));

    let button = document.createElement("button");
    button.type = "button";
    button.textContent = "Blank Time Slot"
    button.style.visibility="hidden";
    button.addEventListener("click", onClick);

    timeSlot.append(button);
    return timeSlot;
}

function onClick(event){
    //Change to time slot editor and pass parameters.
    let id = event.target.dataset.id;
    window.location.href = `timeslot.html?id=${id}`;
}

function fillTimelineView(){
    while(timeSlots.length > 0){
        timeSlots.pop();
    }

    let timelineView = document.getElementById("timelineView");
    timelineView.innerHTML = "";

    for(let i=0; i < hours.length; i++){
        let timeSlot = createTimeSlot();
        let time = hours[i];

        timeSlot.setAttribute("data-id", i); //so we can compare times later
        timeSlot.setAttribute("data-time", time)
        timeSlot.setAttribute("data-occupied", 0);
        timeSlot.setAttribute("data-dj", "");

        timeSlot.childNodes[0].textContent = time;

        timelineView.append(timeSlot);
        timeSlots.push(timeSlot);
    }
}

function fillTimeDropDown(id){
    let dropdown = document.getElementById(id);

    for (let i=0; i < hours.length; i++){
        let currOption = document.createElement("option");
        currOption.setAttribute("value", hours[i]);
        currOption.setAttribute("data-id", i);

        currOption.textContent = hours[i];

        dropdown.append(currOption);
    }
}