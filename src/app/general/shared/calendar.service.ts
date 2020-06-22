import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor() {}

  getCurrentDate(): Date {
    return new Date();
  }
}
