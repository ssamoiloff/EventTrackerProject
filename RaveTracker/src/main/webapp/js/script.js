window.addEventListener('load', function (e) {
	init();
});

function init() {
	console.log('script.js loaded');
	getAllEvents();
	//TODO Everything lol
}

function getAllEvents() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/events');
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let eventJSON = xhr.responseText;
				let events = JSON.parse(eventJSON);
			}
			else {
				errorMessage('Error retrieving events');
			}
		}
	}
	xhr.send();
}