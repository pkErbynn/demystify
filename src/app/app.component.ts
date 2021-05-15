import { Component } from '@angular/core';
import { User } from './interfaces/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demystify';
  users: User[] = [];

  constructor(private userService: UserService){
  }

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe(users => {
      this.users = users
    });
  }
}
