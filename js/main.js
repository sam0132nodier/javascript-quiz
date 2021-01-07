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
	let secondsStr = seconds > 9 ? `${seconds}` : `0${seconds}`;
	document.querySelector('#timer').textContent = `${minutesStr}:${secondsStr}`;

	if (seconds == 56) {
		document.querySelector('#next').click();
		seconds = 60;
	}
	if (seconds == 0) {
		seconds = 60;
	}
}

// Create an initialize function to format the data
function initialize(questions) {
	// Randomly sort questions and select 5 of them.
	let selected = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
	// console.log(selected);
	let selectedHtml = new Array();
	selected.forEach((question) => {
		let optionsHtml = [];
		question.options.forEach((option) => {
			optionsHtml.push(
				`<div>
			        <input type="radio" id="id-${question.options.indexOf(option)}" name="answer" class="checkbox">
					<label for="id-${question.options.indexOf(option)}">
						<li>${option}</li>
					</label>
				</div>`
			);
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
						</form>
			`
		);
	});

	displayData(selectedHtml, selected);
}

function displayData(html, selected) {
	let num = 0;
	let points = 0;
	if (num < html.length) {
		document.querySelector('.question').innerHTML = html[num];

		// Create an observer instance linked to the callbackfunction
		let observer = new MutationObserver(callback);

		// Select the node that'll be used for mutation
		const timerNode = document.querySelector('#timer');
		const config = {
			childList: true,
			characterData: true,
			subtree: true
		};

		function callback(mutationsList) {
			for (const mutation of mutationsList) {
				console.log(mutation.target.textContent);
				if (mutation.type === 'childList') {
					console.log('Node data changed');
				}
			}
		}

		// Start observing the timerNode for configured mutations
		observer.observe(timerNode, config);

		document.addEventListener('click', (e) => {
			if (e.target.id === 'next') {
				clearInterval(myInterval);
				seconds = 60;
				myInterval = setInterval(countDown, 1000);
				let checkboxes = document.querySelectorAll('.checkbox');
				e.preventDefault();
				// Get the form submitted data
				let optionNum = 1;
				checkboxes.forEach((each) => {
					if (each.checked) {
						console.log(each.nextElementSibling.textContent);
						// Grab the selected answer from the checkbox
						let answer = each.nextElementSibling.textContent;
						// Loop through selected questions
						selected.forEach((question) => {
							// This is the question text of corresponding the the checked checkbox
							// console.log(document.querySelector('#question-text').textContent);
							let questionText = document.querySelector('#question-text').textContent;
							// console.log(questionText.substring(questionText.indexOf('.') + 2));
							if (question.question === questionText.substring(questionText.indexOf('.') + 2)) {
								// console.log(question.answer);
								// console.log(answer);
								// console.log(question.answer === answer);
								// If user answer matches the real answer
								if (question.answer === answer) {
									points++;
									// console.log(points);
								}
							}
						});
					} else {
						optionNum++;
						if (optionNum === 4) {
							console.log('None selected');
						}
					}
				});
				num++;
				if (num < html.length) {
					// Move to the next question
					document.querySelector('.question').innerHTML = html[num];
				}

				// Change the next button to finish when questions are over
				if (num === html.length - 1) {
					document.querySelector('#next').innerText = 'Finish';
				}

				// When the quiz ends
				if (num === html.length) {
					let gradeWindow = document.querySelector('.grade');
					// let rating = document.querySelector('#rating');

					let grade = points;
					let percentage = (points * 100) / html.length;

					let ratingSrc = '';
					let ratingAlt = '';
					// Set the stars basing on the percentage
					if (percentage <= 10) {
						ratingSrc = './img/stars1.jpg';
						ratingAlt = 'Really bad';
					} else if (percentage <= 20) {
						ratingSrc = './img/stars2.jpg';
						ratingAlt = 'Bad';
					} else if (percentage <= 30) {
						ratingSrc = './img/stars3.jpg';
						ratingAlt = 'Pretty bad';
					} else if (percentage <= 40) {
						ratingSrc = './img/stars4.jpg';
						ratingAlt = 'Mediocre';
					} else if (percentage <= 50) {
						ratingSrc = './img/stars5.jpg';
						ratingAlt = 'Not bad';
					} else if (percentage <= 60) {
						ratingSrc = './img/stars6.jpg';
						ratingAlt = 'Good';
					} else if (percentage <= 70) {
						ratingSrc = './img/stars7.jpg';
						ratingAlt = 'Very good';
					} else if (percentage <= 80) {
						ratingSrc = './img/stars8.jpg';
						ratingAlt = 'Superb';
					} else if (percentage <= 90) {
						ratingSrc = './img/stars9.jpg';
						ratingAlt = 'Outstanding';
					} else {
						ratingSrc = './img/stars10.jpg';
						ratingAlt = 'Perfect';
					}

					let gradeHTML = `
					<img src="${ratingSrc}" alt="${ratingAlt}" id="rating" />
					<button id="close-grade">+</button>
					<p class="marks">${grade}/${html.length}</p>
					<p class="percentage">${percentage}%</p>
					`;
					if (!quizWindow.classList.contains('hide')) {
						quizWindow.classList.add('hide');
						landing.classList.remove('hide');
					}
					backDrop.classList.remove('hide');
					gradeWindow.classList.remove('hide');
					gradeWindow.innerHTML = gradeHTML;

					// Close the grade window when closeGrade button is clicked
					document.querySelector('#close-grade').addEventListener('click', () => {
						// console.log('clicked');
						clearInterval(myInterval);
						seconds = 60;
						if (!gradeWindow.classList.contains('hide') && !backDrop.classList.contains('hide')) {
							gradeWindow.classList.add('hide');
							backDrop.classList.add('hide');
						}
					});
				}
			}
		});
	}
}

// Close the window the start button is clicked
startButton.addEventListener('click', () => {
	// Fetch data from the json file
	let url = '../questions.json';
	fetch(url).then((response) => {
		response.json().then((json) => {
			let questions = json;
			// console.log(questions);
			initialize(questions);
		});
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
