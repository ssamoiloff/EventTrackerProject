import { Pipe, PipeTransform } from '@angular/core';
import { Event } from 'src/app/models/event';

@Pipe({
  name: 'attending'
})
export class AttendingPipe implements PipeTransform {

  transform(events: Event[]): Event[] {
    let results: Event[] = [];

    for (let i = 0; i < events.length; i++) {
      if (events[i].attending) {
        results.push(events[i]);
      }
    }

    return results;
  }
}
