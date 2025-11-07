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
