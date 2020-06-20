import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events = [];
  newEvent: Event = new Event();
  editEvent = null;
  selected = null;
  isCollapsed: boolean;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.isCollapsed = true;
    this.reload();
  }

  reload() {
    this.eventsService.index().subscribe(
      events => {
        this.events = events;
        console.log(this.events);
      },
      fail => {
        console.error('EventsComponent.index(): error retrieving events');
        console.error(fail);
      }
    );
  }

  displayEvent(event: Event) {
    this.selected = event;
  }

  displayTable() {
    this.selected = null;
  }

  setEditEvent() {
    this.editEvent = Object.assign({}, this.selected);
  }

  addEvent(event: Event) {
    console.log(this.newEvent);

    this.eventsService.create(event).subscribe(
      event => {
        console.log(event);
        this.reload();
        this.newEvent = new Event();
      },
      fail => {
        console.error('EventComponent.addEvent(): Error adding event');
        console.error(fail);
      }
    );
  }
}
