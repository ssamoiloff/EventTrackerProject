import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Event } from 'src/app/models/event';
import { Router } from '@angular/router';

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

  constructor(
    private eventsService: EventsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isCollapsed = true;
    this.reload();
  }

  reload() {
    this.eventsService.index().subscribe(
      events => {
        this.events = events;
        console.log(this.events);
        console.log('RELOAD COMPLETE');

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

  updateEvent(event: Event) {
    this.eventsService.update(event).subscribe(
      event => {
        console.log(event);
        this.reload();
        this.selected = event;
        this.editEvent = null;
      },
      fail => {
        console.error('EventsComponent.updateEvent(): Error updating event');
        console.error(fail);
      }
    )
  }

  deleteEvent(eid: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventsService.destroy(eid).subscribe(
        success => {
          console.log('Success destroying event');
          console.log(success);
          this.selected = null;
          this.reload();
        },
        fail => {
          console.error('EventsComponent.deleteEvent(): Error destroying event');
          console.error(fail);
        }
      )
    }
  }
}
