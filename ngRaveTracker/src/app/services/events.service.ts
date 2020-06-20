import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private baseURL = 'http://localhost:8084/';
  private url = this.baseURL + 'api/events';

  constructor() { }

  // TODO: get, post, put, delete
}
