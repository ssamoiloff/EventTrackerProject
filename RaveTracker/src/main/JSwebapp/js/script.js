window.addEventListener('load', function (e) {
	init();
});

function init() {
	console.log('script.js loaded');
	var allEventsDiv = document.getElementById('allEvents');
	allEventsDiv.textContent = '';
	var summerEventsDiv = document.getElementById('summerEvents');
	summerEventsDiv.textContent = '';
	getAllEvents();

	document.newEventForm.addEvent.addEventListener('click', function (e) {
		e.preventDefault();
		createEvent();
		document.newEventForm.reset();
	});
}

function eventTable(events) {
	let allEventsDiv = document.getElementById('allEvents');
	allEventsDiv.textContent = '';
	let table = document.createElement('table');
	table.id = 'eventsTable';
	table.width = '50%';
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
			editForm(event);
		});
		
		let name = document.createElement('td');
		name.textContent = event.name;
		
		row.appendChild(name);
		body.appendChild(row);
	}
	
	table.appendChild(body);
	allEventsDiv.appendChild(table);
}

function summerEventTable(events) {
	let summerEventsDiv = document.getElementById('summerEvents');
	summerEventsDiv.textContent = '';
	let table = document.createElement('table');
	table.id = 'summerEventsTable';
	table.width = '50%';
	let head = document.createElement('thead');
	let body = document.createElement('tbody');
	
	let headerRow = document.createElement('tr');
	
	let headName = document.createElement('th');
	headName.textContent = 'Summer Events';
	headerRow.appendChild(headName);

	head.appendChild(headerRow);
	table.appendChild(head);
	
	for (let i = 0; i < events.length; i++) {
		let event = events[i];
		if (event.startDate >= '2021-06-01' && event.startDate <= '2021-09-01') {
			let row = document.createElement('tr');
			row.id = 'summerEventRow' + i;
			let name = document.createElement('td');
			name.textContent = event.name;
			
			row.appendChild(name);
			body.appendChild(row);
		}
	}
	
	table.appendChild(body);
	summerEventsDiv.appendChild(table);
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
				eventTable(events);
				summerEventTable(events);
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
					statusMessage(`Invalid event data, unable to create event from ${eventJSON}`);
				}
				else {
					statusMessage('Unknown error creating event');
				}
			}
		}
	}
	xhr.send(eventJSON);
}

function editForm(event) {
	let eid = event.id;
	
	let editView = document.getElementById('editView');
	let form = document.createElement('form');
	form.name = 'editForm';
	form.id = 'editForm';
	
	let id = document.createElement('input');
	id.type = 'hidden';
	id.name = 'id';
	id.value = event.id;
	form.appendChild(id);

	let nameLabel = document.createElement('label');
	nameLabel.for = 'name';
	nameLabel.textContent = 'Event Name';
	let name = document.createElement('input');
	name.type = 'text';
	name.name = 'name';
	name.value = event.name;
	name.placeholder = event.name;
	form.appendChild(nameLabel);
	form.appendChild(document.createElement('br'));
	form.appendChild(name);
	form.appendChild(document.createElement('br'));
	form.appendChild(document.createElement('br'));
	
	let descLabel = document.createElement('label');
	descLabel.for = 'description';
	descLabel.textContent = 'Description';
	let desc = document.createElement('textarea');
	desc.name = 'description';
	desc.value = event.description;
	desc.placeholder = event.description;
	form.appendChild(descLabel);
	form.appendChild(document.createElement('br'));
	form.appendChild(desc);
	form.appendChild(document.createElement('br'));
	form.appendChild(document.createElement('br'));
	
	let sDateLabel = document.createElement('label');
	sDateLabel.for = 'startDate';
	sDateLabel.textContent = 'Start Date';
	let sDate = document.createElement('input');
	sDate.type = 'date';
	sDate.name = 'startDate';
	sDate.value = event.startDate;
	sDate.placeholder = event.startDate;
	form.appendChild(sDateLabel);
	form.appendChild(document.createElement('br'));
	form.appendChild(sDate);
	form.appendChild(document.createElement('br'));
	form.appendChild(document.createElement('br'));
	
	let eDateLabel = document.createElement('label');
	eDateLabel.for = 'endDate';
	eDateLabel.textContent = 'End Date';
	let eDate = document.createElement('input');
	eDate.type = 'date';
	eDate.name = 'endDate';
	eDate.value = event.endDate;
	eDate.placeholder = event.endDate;
	form.appendChild(eDateLabel);
	form.appendChild(document.createElement('br'));
	form.appendChild(eDate);
	form.appendChild(document.createElement('br'));
	form.appendChild(document.createElement('br'));

	let sTimeLabel = document.createElement('label');
	sTimeLabel.for = 'startTime';
	sTimeLabel.textContent = 'Start Time';
	let sTime = document.createElement('input');
	sTime.type = 'time';
	sTime.name = 'startTime';
	sTime.value = event.startTime;
	sTime.placeholder = event.startTime;
	form.appendChild(sTimeLabel);
	form.appendChild(document.createElement('br'));
	form.appendChild(sTime);
	form.appendChild(document.createElement('br'));
	form.appendChild(document.createElement('br'));

	let eTimeLabel = document.createElement('label');
	eTimeLabel.for = 'endTime';
	eTimeLabel.textContent = 'End Time';
	let eTime = document.createElement('input');
	eTime.type = 'time';
	eTime.name = 'endTime';
	eTime.value = event.endTime;
	eTime.placeholder = event.endTime;
	form.appendChild(eTimeLabel);
	form.appendChild(document.createElement('br'));
	form.appendChild(eTime);
	form.appendChild(document.createElement('br'));
	form.appendChild(document.createElement('br'));

	let capLabel = document.createElement('label');
	capLabel.for = 'capacity';
	capLabel.textContent = 'Capacity';
	let cap = document.createElement('input');
	cap.type = 'number';
	cap.name = 'capacity';
	cap.value = event.capacity;
	cap.placeholder = event.capacity;
	form.appendChild(capLabel);
	form.appendChild(document.createElement('br'));
	form.appendChild(cap);
	form.appendChild(document.createElement('br'));
	form.appendChild(document.createElement('br'));

	let imgLabel = document.createElement('label');
	imgLabel.for = 'imgURL';
	imgLabel.textContent = 'Image URL';
	let img = document.createElement('input');
	img.type = 'text';
	img.name = 'imgURL';
	img.value = event.imgURL;
	img.placeholder = event.imgURL;
	form.appendChild(imgLabel);
	form.appendChild(document.createElement('br'));
	form.appendChild(img);
	form.appendChild(document.createElement('br'));
	form.appendChild(document.createElement('br'));

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

	submitButton.addEventListener('click', function (e) {
		e.preventDefault();
		let div = document.getElementById('editView');
		updateEvent();
		div.textContent = '';
	});

	deleteButton.addEventListener('click', function (e) {
		e.preventDefault();
		let div = document.getElementById('editView');
		disableEvent(eid);
		div.textContent = '';
	});

	editView.textContent = '';
	editView.appendChild(form);
}

function updateEvent() {
	let form = document.getElementById('editForm');
	
	let updated = {};
	updated.id = form.id.value;
	updated.name = form.name.value;
	updated.description = form.description.value;
	updated.startDate = form.startDate.value;
	updated.endDate = form.endDate.value;
	updated.startTime = form.startTime.value;
	updated.endTime = form.endTime.value;
	updated.capacity = form.capacity.value;
	updated.imgURL = form.imgURL.value;
	console.log('edited event:');
	console.log(updated);
	putEvent(updated);
}

function putEvent(event) {
	let eventJSON = JSON.stringify(event);
	let xhr = new XMLHttpRequest();
	let uri = `api/events/${event.id}`;
	
	xhr.open('PUT', uri);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let updatedEvent = JSON.parse(xhr.responseText);
				console.log(updatedEvent);
				getAllEvents();
			}
			else {
				if (xhr.status === 400) {
					statusMessage(`Invalid event data, unable to update event from ${eventJSON}`);
				}
				else {
					statusMessage('Unknown error updating event');
				}
			}
		}
	};
	xhr.send(eventJSON);
}

function disableEvent(eid) {
	let xhr = new XMLHttpRequest();
	let uri = `api/events/${eid}`;

	xhr.open('DELETE', uri);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 204) {
				console.log(`Event ${eid} disabled`);
				getAllEvents();
			}
		}
	}
	xhr.send();
}

function allEventsErrorMessage(msg) {
	let allEventsDiv = document.getElementById('allEvents');
	allEventsDiv.textContent = '';
	allEventsDiv.textContent = msg;
}

function statusMessage(msg) {
	let statusMessageDiv = document.getElementById('statusMessage');
	statusMessageDiv.textContent = '';
	statusMessageDiv.textContent = msg;
}