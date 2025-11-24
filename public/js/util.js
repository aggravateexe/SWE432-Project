const bright = 200;

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

function randomInt(bound, inclusive = true){
    return Math.floor(Math.random() * bound) + (inclusive ? 1 : 0);
}

function randomColor(){
    let vals = Array();
    for (let i=0; i < 3; i++){
        vals[i] = randomInt(255);
    }

    // Making sure the color is bright enough so I don't have to worry about the text being hard to see
    let maxVal = Math.max(...vals);
    let maxIndex = vals.indexOf(maxVal);

    if(maxVal < bright){
        vals[maxIndex] = bright
    }
    
    [r,g,b] = vals;

    // Setting up css style value
    let color = `rgb(${r}, ${g}, ${b})`;

    return color;
}