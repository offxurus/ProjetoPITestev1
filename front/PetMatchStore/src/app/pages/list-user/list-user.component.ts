import { Component, OnInit } from '@angular/core';
import { User }               from 'src/app/interfaces/user';
import { UserService }        from 'src/app/services/user.service';
import { Router }             from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  public users: Array<User> = [];
  public hide: boolean = true;
  public userParams: User = { email: '', password: '', name: '', cpf: '', group: ''};
  public showLoading: boolean = false;

  constructor(
    private userService: UserService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(listUser => {
        this.users = listUser.users;
      });
  }
  updateUser() {
    this.showLoading = true;
    this._router.navigate(['/update-user'], {state: this.userParams});
  }
}
