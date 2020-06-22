import { Time } from '@angular/common';

export class Event {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  startTime: Time;
  endTime: Time;
  capacity: number;
  imgURL: string;
  attending: boolean;

  constructor(
    id?: number,
    name?: string,
    description?: string,
    startDate?: Date,
    endDate?: Date,
    startTime?: Time,
    endTime?: Time,
    capacity?: number,
    imgURL?: string,
    attending?: boolean
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.capacity = capacity;
    this.imgURL = imgURL;
    this.attending = attending;
  }
}
