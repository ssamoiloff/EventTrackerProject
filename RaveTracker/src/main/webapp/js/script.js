window.addEventListener('load', function (e) {
	init();
});

function init() {
	console.log('script.js loaded');
	var allEventsDiv = document.getElementById('allEvents');
	allEventsDiv.textContent = '';
	getAllEvents();

	document.newEventForm.addEvent.addEventListener('click', function(e) {
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
	let head = document.createElement('thead');
	let body = document.createElement('tbody');

	let headerRow = document.createElement('tr');

	let headName = document.createElement('th');
	headName.textContent = 'Event Name';
	headerRow.appendChild(headName);
	let headDesc = document.createElement('th');
	headDesc.textContent = 'Description';
	headerRow.appendChild(headDesc);
	let headStDate = document.createElement('th');
	headStDate.textContent = 'Start Date';
	headerRow.appendChild(headStDate);
	let headEndDate = document.createElement('th');
	headEndDate.textContent = 'End Date';
	headerRow.appendChild(headEndDate);
	let headStTime = document.createElement('th');
	headStTime.textContent = 'Start Time';
	headerRow.appendChild(headStTime);
	let headEndTime = document.createElement('th');
	headEndTime.textContent = 'End Time';
	headerRow.appendChild(headEndTime);
	let headCap = document.createElement('th');
	headCap.textContent = 'Capacity';
	headerRow.appendChild(headCap)
	let headImgURL = document.createElement('th');
	headImgURL.textContent = 'Image URL';
	headerRow.appendChild(headImgURL);

	head.appendChild(headerRow);
	table.appendChild(head);

	for (let i = 0; i < events.length; i++) {
		let event = events[i];
		let row = document.createElement('tr');

		let name = document.createElement('td');
		name.textContent = event.name;
		let desc = document.createElement('td');
		desc.textContent = event.description;
		let sDate = document.createElement('td');
		sDate.textContent = event.startDate;
		let eDate = document.createElement('td');
		eDate.textContent = event.endDate;
		let sTime = document.createElement('td');
		sTime.textContent = event.startTime;
		let eTime = document.createElement('td');
		eTime.textContent = event.endTime;
		let cap = document.createElement('td');
		cap.textContent = event.capacity;
		let img = document.createElement('td');
		img.textContent = event.imgURL;

		row.appendChild(name);
		row.appendChild(desc);
		row.appendChild(sDate);
		row.appendChild(eDate);
		row.appendChild(sTime);
		row.appendChild(eTime);
		row.appendChild(cap);
		row.appendChild(img);
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
	xhr.onreadystatechange = function() {
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

function displayEvents(events) {

}

function allEventsErrorMessage(msg) {
	let allEventsDiv = document.getElementById('allEvents');
	allEventsDiv.textContent = '';
	allEventsDiv.textContent = msg;
}

function createEventErrorMessage(msg) {
	let errorDiv = document.getElementById('errorMessage');
	errorDiv.textContent = '';
	errorDiv.textContent = msg;
}