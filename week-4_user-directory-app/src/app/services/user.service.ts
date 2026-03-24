import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../components/users/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/${id}`);
  }
}
