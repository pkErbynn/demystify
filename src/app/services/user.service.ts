import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'https://my-json-server.typicode.com/pkErbynn/user-service-mock/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(  // improved with catchError block
      map((users: User[]) => {
        return users;
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(err.message);
      })
    );
  }
}
