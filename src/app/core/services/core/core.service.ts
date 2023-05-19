import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concat, delay, map } from 'rxjs';

import { User } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const originalUsers = this.http.get<User[]>(
      'https://jsonplaceholder.typicode.com/users'
    );

    const modifiedUsers = originalUsers.pipe(
      delay(5000),
      map((users: User[]) =>
        users.map((user: User) => ({ ...user, name: user.name.toUpperCase() }))
      )
    );

    return concat(originalUsers, modifiedUsers);
  }
}
