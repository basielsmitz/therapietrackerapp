import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoodService {

  // private baseUrl = 'http://localhost:3000/client/mood/';
  private baseUrl = 'https://therapietracker-backend.herokuapp.com/client/mood/';

  constructor(
    private http: HttpClient,
  ) { }

  getMoods(token) {
    return this.http.get(
      `${this.baseUrl}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
  }
  getMood(date, token) {
    return this.http.get(
      `${this.baseUrl + date}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
  }
  getMoodData(token) {
    return this.http.get(
      `${this.baseUrl}data`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
  }
  newMood(data, token) {
    return this.http.post(
      `${this.baseUrl}`, data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
  }
}
