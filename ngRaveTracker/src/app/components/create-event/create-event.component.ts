import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  isCollapsed: boolean;

  constructor(
    private eventsService: EventsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isCollapsed = true;
  }

  addEvent(form: NgForm) {
    const event: Event = form.value;
    this.eventsService.create(event).subscribe(
      newEvent => {
        console.log(newEvent);
        this.router.navigateByUrl('events');
      },
      fail => {
        console.error('EventComponent.addEvent(): Error adding event');
        console.error(fail);
      }
    );
  }
}
