import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  // private baseUrl = 'http://localhost:3000/client/psychologist/invite/';
  private baseUrl = 'https://therapietracker-backend.herokuapp.com/client/psychologist/invite/';

  constructor(
    private http: HttpClient,
  ) { }
  getInvites(token) {
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
  answerInvite(body, token) {
    return this.http.post(
      `${this.baseUrl}`, body,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
  }
}
