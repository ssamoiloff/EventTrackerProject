import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  eventResult;
  eventResults = [];
  isSingleResult: boolean;
  navSubscription;

  constructor(
    private eventsService: EventsService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {
    this.navSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initializeEvents();
      }
    });
  }

  ngOnInit(): void {
    this.isSingleResult = false;
    this.checkRouteSearch();
  }

  ngOnDestroy() {
    if (this.navSubscription) {
      this.navSubscription.unsubscribe();
    }
  }

  checkRouteSearch() {
    const searchParam = this.currentRoute.snapshot.paramMap.get('search');
    const eid = parseInt(searchParam, 10);

    if (!isNaN(eid)) {
      this.eventsService.show(eid).subscribe(
        (event) => {
          console.log(event);
          this.isSingleResult = true;
          this.eventResult = event;
        },
        (fail) => {
          console.error(
            'SearchResultsComponent.eventsService.show(): Error retrieving event'
          );
          console.error(fail);
          this.router.navigateByUrl('fourohfour');
        }
      );
    } else {
      this.eventsService.search(searchParam).subscribe(
        (events) => {
          console.log(events);
          this.eventResults = events;
        },
        (fail) => {
          console.error(
            'SearchResultsComponent.eventService.search(): Error retrieving events'
          );
          console.error(fail);
          this.router.navigateByUrl('fourohfour');
        }
      );
    }
  }

  initializeEvents() {
    this.isSingleResult = false;
    this.eventResults = [];
    this.eventResult = null;
    this.checkRouteSearch();
  }
}
