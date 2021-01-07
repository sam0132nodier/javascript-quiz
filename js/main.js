// Grab some DOM contents
let landing = document.querySelector('.container');
let startButton = document.querySelector('#start');
let quizWindow = document.querySelector('.quiz');
let closeButton = document.querySelector('#close');
let nextButton = document.querySelector('#next');

let backDrop = document.querySelector('.backdrop');
// let closeGrade = document.querySelector('#close-grade');

// Create a function to shuffle elements of an array
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// Display 1 minute timestamp
let myInterval;
let seconds = 60;
function countDown() {
	let minutesStr = '00';
	seconds--;
    let secondsStr = (seconds > 9) ? `${seconds}` : `0${seconds}`;
    document.querySelector('#timer').textContent = `${minutesStr}:${secondsStr}`;
    
    if (seconds == 0) {
        seconds = 60;
    }
}

// Create an initialize function to format the data
function initialize(questions) {
	// Randomly sort questions and select 5 of them.
	let selected = questions.sort(() => .5 - Math.random()).slice(0, 10);
	// console.log(selected);
	let selectedHtml = new Array();
	selected.forEach((question) => {
		let optionsHtml = [];
		question.options.forEach ((option) => {
			optionsHtml.push (`<div>
				<input type="radio" id="id-${question.options.indexOf(option)}" name="answer" class="checkbox">
				<label for="id-${question.options.indexOf(option)}"><li>${option}</li></label>
			</div>`);
		});
		// console.log(optionsHtml);
		selectedHtml.push(
		`<p class="strong" id="question-text">${selected.indexOf(question) + 1}. ${question.question}</p>
			<form action="" method="GET">
				<ol class="options">
					${shuffle(optionsHtml).join('\n')}
				</ol>
				<hr>
				<div class="navigation">
					<div class="timer"><p id="timer">01:00</p></div>
					<div class="next">
					<button id="next" type="submit">Next</button>
					</div>
				</div>
			</form>`
		);
	});

	displayData(selectedHtml, selected);
}

// Close the window the start button is clicked
startButton.addEventListener('click', () => {
	// Fetch data from the json file
	let url = "../questions.json";
	fetch(url).then((response) => {
		response.json().then((json) => {
			let questions = json;
			// console.log(questions);
			initialize(questions);
		})
	});
	// num = 0;
	if (quizWindow.classList.contains('hide')) {
		quizWindow.classList.remove('hide');
		landing.classList.add('hide');
	}
	myInterval = setInterval(countDown, 1000);
	seconds = 60;
});

// Close the window the close button is clicked
closeButton.addEventListener('click', () => {
	clearInterval(myInterval);
	seconds = 60;
	if (!quizWindow.classList.contains('hide')) {
		quizWindow.classList.add('hide');
		landing.classList.remove('hide');
	}
});
