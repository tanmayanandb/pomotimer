const myHours = document.getElementById("myHours");
const myMins = document.getElementById("myMins");
const myButton = document.getElementById("myButton");

const timerText = document.getElementById("timer");
const pomotimerText = document.getElementById("pomotimer");

const myContinue = document.getElementById("myContinue");
const myTimer = document.getElementById("timer");
const myTimerBox = document.getElementById("timerdivdiv")

const myButtonPomo = document.getElementById("myButtonPomo");
const myContinuePomo = document.getElementById("myContinuePomo");

const selectTimer = document.getElementById("timerbutton");
const selectPomo = document.getElementById("pomodorobutton");

const displayTimer = document.getElementById("simpletimer");
const displayPomodoro = document.getElementById("pomodorotimer");

const workDisplay = document.getElementById("breakDisplay");

const myIndicator = document.getElementsByClassName("indicator-alpha");

const mySettings = document.getElementById("settingspage");
const settingsButton = document.getElementById("settingsbutton");

const selectWork = document.getElementById("selectWork"); 
const selectBreak = document.getElementById("selectBreak"); 
const selectLongBreak = document.getElementById("selectLongBreak"); 

const modal = document.getElementById("modal");

const myBody = document.querySelector("body");


let pomocycles = 0;

function indicator(){
    myIndicator[0].classList.add("indicator");
    if(workcycles%4==0 && workcycles!=0){
        for(let i=1;i<4;i++){
            myIndicator[i].classList.remove("indicator");
        }
        return;
    }
    myIndicator[workcycles%4].classList.add("indicator");
}

function indicatorclear(){

    for(let i=0;i<4;i++){
        myIndicator[i].classList.remove("indicator");
    }

}

function decMin(){
    minutes = minutes-1;
}

function timerloop(){
    timerText.textContent=`${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}`;
    intervalID = setInterval(()=>{
                decMin();
                if(minutes==-1){
                    if(hours==0){
                        clearInterval(intervalID);
                        TimerOn = false;
                        const myAudio = new Audio("./audio/alarm.mp3");
                        myAudio.play();
                        myButton.textContent = "Start Timer";
                        return;
                    }
                    else{
                        hours--;
                        minutes=59;
                    }
                }
                timerText.textContent=`${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}`;
        },1000);
}

function pomotimerloop(){
    pomotimerText.textContent=`${String(hourspomo).padStart(2,"0")}:${String(minutespomo).padStart(2,"0")}`;
    intervalID = setInterval(()=>{
                minutespomo--;
                if(minutespomo==-1){
                    if(hourspomo==0){
                        const myAudio = new Audio("./audio/alarm.mp3");
                        myAudio.play();
                        if(pomocycles%2==0){
                            if(workcycles%4==0 && workcycles!=0){
                                console.log(longBreakHours, longBreakMins);
                                hourspomo=longBreakHours;
                                minutespomo=longBreakMins;
                            }
                            else{
                                hourspomo=breakHours;
                                minutespomo=breakMins;
                            }
                            workDisplay.textContent="Break";
                        }
                        else{
                            indicator();
                            workcycles++;
                            hourspomo=maxHours;
                            minutespomo=maxMins;
                            workDisplay.textContent="Work";
                        }
                        pomocycles++;
                    }
                    else{
                        hourspomo--;
                        minutespomo=59;
                    }
                }
                pomotimerText.textContent=`${String(hourspomo).padStart(2,"0")}:${String(minutespomo).padStart(2,"0")}`;
        },1000);
}

const fontarray = ["Roboto","Calibri","monospace"];
let index = 0;

let hours = 0;
let minutes = 0;

let hourspomo=25;
let minutespomo=0;

let intervalID = null;
let TimerOn = false;
myContinue.disabled = true;

let isTimerSelected = true;

let maxHours = 25;
const maxMins = 0;

let breakHours = 5;
const breakMins = 0;

let longBreakHours = 15;
const longBreakMins = 0;

let workcycles=0;

const imgArray = ["./images/bg1.jpg","./images/bg2.jpg","./images/bg3.jpg"]
let imgIndex=0;


if(localStorage.getItem("hours") && localStorage.getItem("minutes")){
    hours = localStorage.getItem("hours");
    minutes = localStorage.getItem("minutes");
    myHours.value=parseInt(hours);
    myMins.value=parseInt(minutes);
}

myButton.addEventListener("click", ()=>{
    if(!TimerOn){
        TimerOn = true;
        myContinue.disabled = true;
        myButton.textContent = "Pause";
        hours = parseInt(myHours.value);
        minutes = parseInt(myMins.value);
        myHours.value=9;
        myMins.value=59;
        if(Number.isNaN(hours)) hours=0;
        if(Number.isNaN(minutes)) minutes=0;
        if(hours>99 || hours<0) hours=99;
        if(minutes>59 || minutes<0) minutes=59;
        timerloop();
    }
    else{
        myButton.textContent = "Reset";
        TimerOn=false;
        myContinue.disabled = false;
        clearInterval(intervalID);
        localStorage.setItem("hours",hours);
        localStorage.setItem("minutes",minutes);
    }
});

myContinue.addEventListener("click",()=>{
    if(TimerOn){

    }
    else{
        timerloop();
        TimerOn = true;
        myContinue.disabled = true;
        myButton.textContent = "Pause";
    }
});

myTimer.addEventListener("click",()=>{
    index++;
    myTimer.style.fontFamily = fontarray[index%fontarray.length];
    

});

selectPomo.addEventListener("click",()=>{
    isTimerSelected=false;
    displayTimer.classList.add("hidden");
    displayPomodoro.classList.remove("hidden");
    
})

selectTimer.addEventListener("click",()=>{
    isTimerSelected=false;
    displayTimer.classList.remove("hidden");
    displayPomodoro.classList.add("hidden");

    
})

myButtonPomo.addEventListener("click",()=>{
    if(!TimerOn){
        indicatorclear();
        workcycles=0;
        TimerOn = true;
        indicator();
        workcycles = 1;
        hourspomo = maxHours;
        minutespomo = maxMins;
        myContinuePomo.disabled = true;
        myButtonPomo.textContent = "Pause";
        clearInterval(intervalID);
        pomotimerloop();
    }
    else{
        myButtonPomo.textContent = "Reset";
        TimerOn=false;
        myContinuePomo.disabled = false;
        clearInterval(intervalID);
    }
})

myContinuePomo.addEventListener("click",()=>{
    console.log(TimerOn)
    if(TimerOn){

    }
    else{
        myButtonPomo.textContent = "Reset";
        pomotimerloop();
        TimerOn = true;
        myContinuePomo.disabled = true;
        myButtonPomo.textContent = "Pause";
    }
});

let settingsState = false;

settingsButton.addEventListener("click",()=>{
    if(!settingsState){
        mySettings.classList.remove("hidden");
        modal.classList.remove("hidden");
        settingsState = true;

    }
    else{
        mySettings.classList.add("hidden");
        modal.classList.add("hidden");
        settingsState = false;
    }
})

selectWork.addEventListener("change",()=>{
    let minutes = selectWork.value;
    if(Number.isInteger(parseInt(minutes))){
        if(minutes>99 || minutes<0){
            minutes=25;
        }
        maxHours = minutes;
    }
})

selectBreak.addEventListener("change",()=>{
    let minutes = selectBreak.value;
    if(minutes>99 || minutes<0){
            minutes=5;
        }
    if(Number.isInteger(parseInt(minutes))){
        breakHours = minutes;
    }
})

selectLongBreak.addEventListener("change",()=>{
    let minutes = selectLongBreak.value;
    if(minutes>99 || minutes<0){
            minutes=15;
        }
    if(Number.isInteger(parseInt(minutes))){
        longBreakHours = minutes;
    }
})

modal.addEventListener("click",(event)=>{
    if(event.target==modal){
        mySettings.classList.add("hidden");
        modal.classList.add("hidden");
        settingsState = false;
    }
})

myBody.addEventListener("dblclick",()=>{
    imgIndex++;
    if(imgIndex==imgArray.length){
        imgIndex=0;
    }
    console.log(imgArray[imgIndex])
    myBody.style.backgroundImage = `url(${imgArray[imgIndex]})`;
})









