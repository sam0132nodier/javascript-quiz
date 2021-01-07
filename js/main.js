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
