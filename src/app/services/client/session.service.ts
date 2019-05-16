import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private baseUrl = 'http://localhost:3000/client/session/';
  constructor(
    private http: HttpClient,
  ) { }
  test() {
    console.log('test');
  }
  getSessions(token) {
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
  getSession(id, token) {
    return this.http.get(
      `${this.baseUrl + id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
  }
  evaluateSession(id, data, token) {
    return this.http.post(
      `${this.baseUrl + id}`, data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
  }
}
