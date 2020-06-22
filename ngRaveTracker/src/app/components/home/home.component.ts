import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.eventsService.index().subscribe(
      events => {
        console.log(events);
      },
      fail => {
        console.error('HomeComponent.eventsService.index(): error retrieving events');
        console.error(fail);
      }
    );
  }

}
