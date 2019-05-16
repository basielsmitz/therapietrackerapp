import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private baseUrl = 'http://localhost:3000/psy/session/';
  constructor(
    private http: HttpClient,
    private storage: Storage,
  ) { }

  getSessionsToday(token, dateString) {
    return this.http.get(
      `${this.baseUrl}today/${dateString}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
  }
  getAllSessions(token) {
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
   postNewSession(data, token) {
    return this.http.post(`${this.baseUrl}`, data,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  }
  getSession(id, token) {
    console.log(this.baseUrl);
    return this.http.get(`${this.baseUrl}${id}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  }
  updateSession(id, token) {
    console.log(this.baseUrl);
    return this.http.get(`${this.baseUrl}${id}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  }
  deleteSession(id, token) {
    console.log(this.baseUrl);
    return this.http.delete(`${this.baseUrl}${id}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  }

}
