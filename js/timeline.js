document.addEventListener("DOMContentLoaded", () =>{
    fillTimelineView();
    fillTimeDropDown("dropStart");
    fillTimeDropDown("dropEnd");

    let btnSave = document.getElementById("btnSave");
    btnSave.addEventListener("click", event => {
        alert("Changes Saved!");
    });

    let form = document.forms["timelineForm"]
    form.addEventListener("submit", event => {
        event.preventDefault();

        let dropStart = form["dropStart"];
        let dropEnd = form["dropEnd"];

        let startID = parseInt(dropStart.options[dropStart.selectedIndex].dataset.id);
        let endID = parseInt(dropEnd.options[dropEnd.selectedIndex].dataset.id);

        //validating if times are valid.
        if(startID === endID){
            alert("Start and End times MUST be different!");
            return false;
        }
        else if(endID < startID){
            alert("Start time MUST be before End time!");
            return false;
        }

        let timelineView = document.getElementById("timelineView");
        let timesections = Array.from(timelineView.childNodes);
        let selectedSections = Array();
        
        for(let i = startID; i < endID; i++){
            selectedSections.push(timesections[i]);
        }

        console.log(selectedSections);

        let occupiedSections = selectedSections.filter(section => parseInt(section.dataset.occupied) > 0);

        if(occupiedSections.length > 0){
            let times = occupiedSections.map(section => section.dataset.time);
            times = times.join(", ");
            alert(`The Time Slot(s): ${times}, are already taken!`);
            return false;
        }

        selectedSections.forEach(section => {
            section.setAttribute("data-occupied", 1);

            let button = section.getElementsByTagName("button")[0];
            button.style.visibility = "visible";
        });

        return true;
        });
});

function createTimeSection(){
    let timeSection = document.createElement("div");
    timeSection.setAttribute("class", "timesection");
    timeSection.append(document.createElement("p"));

    let button = document.createElement("button");
    button.type = "button";
    button.textContent = "Blank Time Slot"
    button.style.visibility="hidden";
    button.addEventListener("click", event => {
        //Change to time slot editor and pass parameters.
        window.location.href = "timeslot.html";
    });

    timeSection.append(button);
    return timeSection;
}

function fillTimelineView(){
    let timelineView = document.getElementById("timelineView");
    timelineView.innerHTML = "";

    let hours = getHours();
    for(let i=0; i < hours.length; i++){

        let currSection = createTimeSection();
        let time = hours[i];

        currSection.setAttribute("data-id", i); //so we can compare times later
        currSection.setAttribute("data-time", time)
        currSection.setAttribute("data-occupied", 0);
        currSection.setAttribute("data-dj", "");

        currSection.childNodes[0].textContent = time;

        timelineView.append(currSection);
    }
}

function fillTimeDropDown(id){
    let dropdown = document.getElementById(id);
    let hours = getHours();

    for (let i=0; i < hours.length; i++){
        let currOption = document.createElement("option");
        currOption.setAttribute("value", hours[i]);
        currOption.setAttribute("data-id", i);

        currOption.textContent = hours[i];

        dropdown.append(currOption);
    }
}