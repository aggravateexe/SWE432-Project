function getHours(){
    let hours = new Array();
    
    for(let i=0; i < 24; i++){
        let time = "";
        if(i < 12){
            time =  `${i % 12 == 0 ? 12 : i % 12} AM`;
        }else{
            time = `${i % 12 == 0 ? 12 : i % 12} PM`;
        }

        hours.push(time);
    }

    return hours;
}

function fillTimelineView(){
    let timelineView = document.getElementById("timelineView");
    let timeSection = document.createElement("div");
    timeSection.setAttribute("class", "timeSection");

    let hours = getHours();

    for(let i=0; i < hours.length; i++){

        let currSection = timeSection.cloneNode();
        currSection.setAttribute("dataset-time", i); //so we can compare times later
        currSection.textContent = hours[i];

        timelineView.append(currSection);
    }
}

function fillTimeDropDown(id){
    let dropdown = document.getElementById(id);
    let hours = getHours();

    for (let i=0; i < hours.length; i++){
        let currOption = document.createElement("option");
        currOption.setAttribute("value", hours[i]);
        currOption.textContent = hours[i];

        dropdown.append(currOption);
    }
}