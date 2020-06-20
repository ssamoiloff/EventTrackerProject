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
  selected = null;
  editEvent = null;
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
}
