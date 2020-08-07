const circleElement = document.querySelector('.circle');
const timeElement = document.querySelector('.time');
const timeModeElement = document.querySelector('.time-mode');
const turnElement = document.querySelector('.turns');
const controlButton = document.querySelector('.timer-control');
const resetButton = document.querySelector('.reset-button');
const notificationSound = document.querySelector('#notification');
const timeContainerElement = document.querySelector('.time-container');

let isRunning,
	isBreakTime,
	workTime,
	breakTime,
	longBreakTime,
	totalTurns,
	currentTurn,
	totalTime,
	timeRemaining,
	timer;

controlButton.addEventListener('click', toggleStartPause);
resetButton.addEventListener('click', reset);
timeContainerElement.addEventListener("click", function(e) {
	e.preventDefault;

	// -> removing the class
	element.classList.remove("animated rotateIn");

	// -> triggering reflow /* The actual magic */
	// without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
	// Oops! This won't work in strict mode. Thanks Felis Phasma!
	// element.offsetWidth = element.offsetWidth;
	// Do this instead:
	void element.offsetWidth;

	// -> and re-adding the class
	element.classList.add("animated rotateIn");
  }, false);

function startValues() {
	isRunning = false;
	isBreakTime = false;
	workTime = .1 * 60;
	breakTime = .1 * 60;
	longBreakTime = .1 * 60;
	totalTurns = 4;
	currentTurn = 1;
	totalTime = workTime;
	timeRemaining = totalTime;
	timer = null;
}

function toggleStartPause() {
	isRunning ? pause() : start();
}

function start() {
	isRunning = true;
	controlButton.innerText = 'Pausar';
	timer = setInterval(updateTimer, 1000);
}

function pause() {
	isRunning = false;
	controlButton.innerText = 'Iniciar';
	clearInterval(timer);
}

function reset() {
	pause();
	startValues();
	drawTime();
	drawTurn();
}

function updateTimer() {
	if (timeRemaining > 0) {
		timeRemaining--;
	}
	else {
		finishTurn();
	}
	drawTime();
}

function finishTurn() {
	notificationSound.play();

	nextTurn();
	drawTurn();
}

function nextTurn() {
	isBreakTime = !isBreakTime;
	if (!isBreakTime) {
		currentTurn++;
	}

	if (currentTurn <= totalTurns) {
		if (isBreakTime) {
			totalTime = currentTurn < totalTurns ? breakTime : longBreakTime;
		} else {
			totalTime = workTime;
		}
		timeRemaining = totalTime;
	} else {
		reset();
	}
}

function drawTime() {
	const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
	const seconds = Math.floor(timeRemaining % 60).toString().padStart(2, '0');

	timeElement.innerText = `${minutes}:${seconds}`;
	setCirclePercent(timeRemaining / totalTime * 100);
}

function drawTurn() {
	let timeMode = 'Trabalho';
	if (isBreakTime) {
		timeMode = currentTurn < totalTurns ? 'Descanso' : 'Descanso Longo';
	}
	timeModeElement.innerText = timeMode;
	turnElement.innerText = `${currentTurn}/${totalTurns}`;
}

function setCirclePercent(percent) {
	const circlePerimeter = 597;
	const dashOffset = (circlePerimeter * (percent / 100));

	circleElement.style.setProperty('--dash-offset', circlePerimeter - dashOffset);
}

reset();