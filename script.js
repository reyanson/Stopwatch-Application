const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('restartBtn');

const laplist = document.getElementById('laplist');

/// stopwatch variables

let minutes = 0;
let seconds = 0
let milliseconds = 0;
let interval;

let min = 0;
    let sec = 0;
    let millsec = 0;

startButton.addEventListener('click',startTimer);
stopButton.addEventListener('click',stopTimer);
pauseButton.addEventListener('click',pauseTimer);
resetButton.addEventListener('click',resetTimer);


function startTimer(){
    interval = setInterval(updateTimer,1);
    startButton.disabled= true;
    pauseButton.disabled = false;
    stopButton.disabled = false;
}

function stopTimer(){
    // clearInterval(interval);
    addToLapList();
    // resetTimerData();
    startButton.disabled = false;
    

}

function pauseTimer(){
    clearInterval(interval);
    pauseButton.disabled= true;
    startButton.disabled = false;

}

function resetTimer(){
    clearInterval(interval);

    resetTimerData();
    startButton.disabled = false;

}

function updateTimer(){
    milliseconds++;
    if(milliseconds === 100){
        milliseconds = 0;
        seconds++;
        if(seconds === 60 ){
            seconds = 0;
            minutes++;
        }
    }
    displayTimer();
}

function displayTimer(){
    millisecondsLabel.textContent = padTime(milliseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);
}

function padTime(time){
    return time.toString().padStart(2,'0')
}

function resetTimerData(){
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    displayTimer();
}

function addToLapList(){
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>Lap ${laplist.childElementCount + 1}: </span>${lapTime} <span>Different: + ${Math.abs(minutes-min)}:${Math.abs(seconds-sec)}:${Math.abs(milliseconds - millsec)} </span>`;
    laplist.appendChild(listItem);
    min = minutes;
    sec = seconds;
    millsec = milliseconds;
}
