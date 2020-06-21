import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumber } from 'util';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  eventResult: Event = null;
  eventResults: Event[] = [];

  constructor(
    private eventsService: EventsService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkRouteSearch();
  }

  checkRouteSearch(){
    const searchParam = this.currentRoute.snapshot.paramMap.get('search');
    if (isNumber(searchParam)) {
      const eid = parseInt(searchParam, 10);
      this.eventsService.show(eid).subscribe(
        event => {
          console.log(event);
          this.eventResult = event;
        },
        fail => {
          console.error('SearchResultsComponent.eventsService.show(): Error retrieving event')
          console.error(fail);
          this.router.navigateByUrl('fourohfour');
        }
      )
    }
    else {
      this.eventsService.search(searchParam).subscribe(
        events => {
          console.log(events);
          this.eventResults = events;
        },
        fail => {
          console.error('SearchResultsComponent.eventService.search(): Error retrieving events');
          console.error(fail);
          this.router.navigateByUrl('fourohfour');
        }
      )
    }
  }

  showResults() {

  }
}
