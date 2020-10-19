// Grab some DOM contents
let landing = document.querySelector('.container');
let startButton = document.querySelector('#start');
let quizWindow = document.querySelector('.quiz');
let closeButton = document.querySelector('#close');
let nextButton = document.querySelector('#next');

// Fetch data from the json file
let url = "../questions.json";
fetch(url).then((response) => {
	response.json().then((json) => {
		let questions = json;
		// console.log(questions);
		initialize(questions);
	})
});

// Create an initialize function to format the data
function initialize(questions) {
	let selected = questions.sort(() => .5 - Math.random()).slice(0, 10);
	// console.log(selected);
	let selectedHtml = new Array();
	selected.forEach((each) => {
		let optionsHtml = [];
		each.options.forEach ((each) => {
			optionsHtml.push (`<div>
				<input type="radio" id="${each}" name="answer" value="${each}">
				<label for="${each}"><li>${each}</li></label>
			</div>`);
		});
		// console.log(optionsHtml);
		selectedHtml.push(
		`<p class="strong">${each.question}</p>
			<form action="" method="GET">
				<ol class="options">
					${optionsHtml.join('\n')}
				</ol>
				<hr>
				<div class="navigation">
					<div class="timer"><p>01:00</p></div>
					<div class="next">
						<button id="next" type="submit">Next</button>
					</div>
				</div>
			</form>`
		);
	});

	displayData(selectedHtml);
}

let num = 0;
function displayData(html) {
	if (num < html.length) {
		document.querySelector('.question').innerHTML = html[num];
		document.addEventListener('click', (e) => {
			e.preventDefault();
			if (e.target.id === 'next') {
				// Get the form submitted data
				num++
				document.querySelector('.question').innerHTML = html[num];
			}
		});
	}
}

// Close the window the start button is clicked
startButton.addEventListener('click', () => {
	num = 0;
	if (quizWindow.classList.contains('hide')) {
		quizWindow.classList.remove('hide');
		landing.classList.add('hide');
	}
});

// Close the window the close button is clicked
closeButton.addEventListener('click', () => {
	num = 0;
	if (!quizWindow.classList.contains('hide')) {
		quizWindow.classList.add('hide');
		landing.classList.remove('hide');
	}
})