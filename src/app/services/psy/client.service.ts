import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:3000/psy/client/';


  constructor(
    private http: HttpClient,
  ) { }

  getClients(token) {
    return this.http.get(this.baseUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  }
  getClient(id, token) {
    return this.http.get(`${this.baseUrl + id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  }
  getClientContact(id, token) {
    return this.http.get(`${this.baseUrl + id}/contact`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  }
  updateClient(id, data, token) {
    return this.http.put(`${this.baseUrl + id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  }
  getClientGoals(id, token) {
    return this.http.get(`${this.baseUrl + id}/goal`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  }
  getClientSessions(id, token) {
    return this.http.get(`${this.baseUrl + id}/session`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  }
  getClientSession(id, sessionId, token) {
    return this.http.get(`${this.baseUrl + id}/session/${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  }
  getClientMoods(id, token) {
    return this.http.get(`${this.baseUrl + id}/mood`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  }
  getClientMood(id, date, token) {
    return this.http.get(`${this.baseUrl + id}/mood/${date}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  }
  getClientNotes(id, token) {
    return this.http.get(`${this.baseUrl + id}/note`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  }
}
