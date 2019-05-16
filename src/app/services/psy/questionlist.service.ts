import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionlistService {
  private baseUrl = 'http://localhost:3000/psy/questionlist/';

  constructor(private http: HttpClient) { }

  getQuestionLists(token) {
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
  getQuestionList(id, token) {
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
  postQuestionLists(data, token) {
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
  updateQuestionLists(id, data, token) {
    return this.http.put(
      `${this.baseUrl + id}`, data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
  }
  deleteQuestionLists(id, token) {
    return this.http.delete(
      `${this.baseUrl + id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
  }
}
