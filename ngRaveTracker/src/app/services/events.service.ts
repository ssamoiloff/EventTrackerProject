import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private baseURL = 'http://localhost:8084/';
  private url = this.baseURL + 'api/events';

  constructor(private http: HttpClient) {}

  // TODO: get, post, put, delete
  index() {
    return this.http.get<Event[]>(this.url).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          'EventsService.index(): Error retrieving events' + err
        );
      })
    );
  }

  show(eid: number) {
    return this.http.get<Event>(`${this.url}/${eid}`).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          'EventsService.show(): Error retrieving event: ' + err
        );
      })
    );
  }

  search(search: string) {
    return this.http.get<Event[]>(`${this.url}/search/${search}`).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          'EventsService.search(): Error retrieving search results for: ' + err
        );
      })
    );
  }

  create(event) {
    return this.http.post<Event>(this.url, event).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          'EventsService.create(): Error creating event: ' + err
        );
      })
    );
  }

  update(event) {
    return this.http.put<Event>(`${this.url}/${event.id}`, event).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          'EventsService.update(): Error updating event: ' + err
        );
      })
    );
  }

  destroy(eid: number) {
    return this.http.delete<Event>(`${this.url}/${eid}`).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          'EventsService.destroy(): Error destroying event: ' + err
        );
      })
    );
  }
}
