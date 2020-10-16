// Fetch data from the json file
let url = "../questions.json";
fetch(url).then((response) => {
	response.json().then((json) => {
		console.log(json);
	});
});