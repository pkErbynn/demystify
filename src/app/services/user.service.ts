import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>("https://my-json-server.typicode.com/pkErbynn/user-service-mock/users");
  }
}
