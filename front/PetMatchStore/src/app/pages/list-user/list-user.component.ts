import { Component, OnInit } from '@angular/core';
import { User }               from 'src/app/interfaces/user';
import { UserService }        from 'src/app/services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  public users: Array<User> = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(listUser => {
        this.users = listUser.users;
      });
  }
}
