window.addEventListener('load', function (e) {
	init();
});

function init() {
	console.log('script.js loaded');
	var allEventsDiv = document.getElementById('allEvents');
	allEventsDiv.textContent = '';
	getAllEvents();

	document.newEventForm.addEvent.addEventListener('click', function (e) {
		e.preventDefault();
		createEvent();
		// getAllEvents();
	});
	//TODO Everything lol
}

function createTable(events) {
	console.log('in createTable()');

	let allEventsDiv = document.getElementById('allEvents');
	allEventsDiv.textContent = '';
	let table = document.createElement('table');
	table.id = 'eventsTable';
	let head = document.createElement('thead');
	let body = document.createElement('tbody');

	let headerRow = document.createElement('tr');

	let headName = document.createElement('th');
	headName.textContent = 'Event Name';
	headerRow.appendChild(headName);

	head.appendChild(headerRow);
	table.appendChild(head);

	for (let i = 0; i < events.length; i++) {
		let event = events[i];
		let row = document.createElement('tr');
		row.id = 'eventRow' + i;
		row.addEventListener('click', function (e) {
			e.preventDefault();
			console.log('event clicked');
		});

		let name = document.createElement('td');
		name.textContent = event.name;

		row.appendChild(name);
		body.appendChild(row);
	}

	table.appendChild(body);
	allEventsDiv.appendChild(table);
}

function getAllEvents() {
	console.log('in getAllEvents()');

	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/events');
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let eventJSON = xhr.responseText;
				let events = JSON.parse(eventJSON);
				createTable(events);
			}
			else {
				allEventsErrorMessage('Error retrieving events');
			}
		}
	}
	xhr.send();
}

function createEvent() {
	let form = document.newEventForm;
	let event = {};
	event.name = form.name.value;
	event.description = form.description.value;
	event.startDate = form.startDate.value;
	event.endDate = form.endDate.value;
	event.startTime = form.startTime.value;
	event.endTime = form.endTime.value;
	event.capacity = form.capacity.value;
	event.imgURL = form.imgURL.value;
	console.log('createEvent():');
	console.log(event);
	postEvent(event);
}

function postEvent(event) {
	let eventJSON = JSON.stringify(event);
	let xhr = new XMLHttpRequest();
	let uri = 'api/events';

	xhr.open('POST', uri);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let createdEvent = JSON.parse(xhr.responseText);
				console.log(createdEvent);
				getAllEvents();
			}
			else {
				if (xhr.status === 400) {
					createEventErrorMessage(`Invalid event data, unable to create event from ${eventJSON}`);
				}
				else {
					createEventErrorMessage('Unknown error creating event');
				}
			}
		}
	}
	xhr.send(eventJSON);
}

function editForm(event) {
	let form = document.createElement('form');
	form.name = 'editForm';

	let name = document.createElement('input');
	name.type = 'text';
	name.name = 'name';
	name.placeholder = event.name;
	document.createElement('br');
	form.appendChild(name);

	let desc = document.createElement('textarea');
	desc.name = 'description';
	desc.placeholder = event.description;
	document.createElement('br');
	form.appendChild(desc);

	let sDate = document.createElement('input');
	sDate.type = 'date';
	sDate.name = 'startDate';
	sDate.placeholder = event.startDate;
	document.createElement('br');
	form.appendChild(sDate);

	let eDate = document.createElement('input');
	eDate.type = 'date';
	eDate.name = 'endDate';
	eDate.placeholder = event.endDate;
	document.createElement('br');
	form.appendChild(eDate);

	let sTime = document.createElement('input');
	sTime.type = 'time';
	sTime.name = 'startTime';
	sTime.placeholder = event.startTime;
	document.createElement('br');
	form.appendChild(sTime);

	let eTime = document.createElement('input');
	eTime.type = 'time';
	eTime.name = 'endTime';
	eTime.placeholder = event.endTime;
	document.createElement('br');
	form.appendChild(eTime);

	let cap = document.createElement('input');
	cap.type = 'number';
	cap.name = 'capacity';
	cap.placeholder = event.capacity;
	document.createElement('br');
	form.appendChild(cap);

	let img = document.createElement('input');
	img.type = 'text';
	img.name = 'imgURL';
	img.placeholder = event.imgURL;
	document.createElement('br');
	form.appendChild(img);

	let submitButton = document.createElement('input');
	submitButton.type = 'submit';
	submitButton.name = 'editButton';
	submitButton.value = 'Submit Edit';
	form.appendChild(submitButton);

	let deleteButton = document.createElement('input');
	deleteButton.type = 'submit';
	deleteButton.name = 'deleteButton';
	deleteButton.value = 'Delete Event';
	form.appendChild(deleteButton);

	submitButton.addEventListener('click', function(e) {
		e.preventDefault();
		let xhr = new XMLHttpRequest();
		xhr.open('PUT', `api/events/${event.id}`);
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {

				}
			}
		}
	});

	deleteButton.addEventListener('click', function(e))
}

function allEventsErrorMessage(msg) {
	let allEventsDiv = document.getElementById('allEvents');
	allEventsDiv.textContent = '';
	allEventsDiv.textContent = msg;
}

function createEventErrorMessage(msg) {
	let errorDiv = document.getElementById('statusMessage');
	errorDiv.textContent = '';
	errorDiv.textContent = msg;
}