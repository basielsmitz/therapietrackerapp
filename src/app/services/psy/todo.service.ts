import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'https://therapietracker-backend.herokuapp.com/psy/todo/';
  // private baseUrl = 'http://localhost:3000/psy/todo/';
  constructor(
    private http: HttpClient,
  ) { }

  getTodos(token) {
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
  changeStatusTodo(id, token) {
    return this.http.put(`${this.baseUrl}${id}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  }
}
