let timerInterval;
let elapsedTime = 0; // in milliseconds

const stopwatchDuration = document.getElementById('stopwatchDuration');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(ms % 1000).padStart(3, '0').slice(0, 2);
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    stopwatchDuration.textContent = formatTime(elapsedTime);
}

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    stopButton.style.display = 'inline-block';
    resetButton.style.display = 'none';
    lapButton.disabled = false;

    timerInterval = setInterval(() => {
        elapsedTime += 100; // Increment by 100ms
        updateDisplay();
    }, 100);
});

stopButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    startButton.style.display = 'inline-block';
    stopButton.style.display = 'none';
    resetButton.style.display = 'inline-block';
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    resetButton.style.display = 'none';
    lapButton.disabled = true;
    startButton.style.display = 'inline-block';
    stopButton.style.display = 'none';
    lapsList.innerHTML = ''; // Clear laps
});

lapButton.addEventListener('click', () => {
    const lapTime = document.createElement('li');
    lapTime.textContent = formatTime(elapsedTime);
    lapsList.appendChild(lapTime);
});
