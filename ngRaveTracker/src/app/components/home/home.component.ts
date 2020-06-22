import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  navSubscription;

  constructor(
    private eventsService: EventsService,
    private router: Router
  ) {
    this.navSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.index();
      }
    });
  }

  ngOnInit(): void {
    this.index();
  }

  index() {
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
