import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  // private baseUrl = 'http://localhost:3000/client/goal/';
  private baseUrl = 'https://therapietracker-backend.herokuapp.com/client/goal/';

  constructor(
    private http: HttpClient,
  ) { }

  getGoals(token) {
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
  changeStatusGoal(id, token) {
    return this.http.put(
      `${this.baseUrl + id}`, {},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
  }
  createGoal(data, token) {
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
