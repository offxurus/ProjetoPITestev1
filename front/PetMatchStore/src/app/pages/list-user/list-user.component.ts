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
  public userParams: User = { email: '', password: '', name: '', cpf: '', group: '', active: true};
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
  updateUser(user: User) {
    this.showLoading = true;
    this._router.navigate(['/sign-in'], {state: user});
  }
  search(name: string){
    if(!name || name == ''){
      this.getUsers()
    } else {
      this.userService.getUsersbyName(name)
      .subscribe(listUser => {
        this.users = listUser;
      });
    }
  }
  activeUser(active: boolean = true, user: User){
    if(confirm("Confirma a alteração de status")){
      this.userParams = user
      this.userParams.active = !active
      this.showLoading = true;
      this.userService.updateUser(this.userParams).subscribe(
        () => {
          this.showLoading = false;
          this.getUsers()
        },
        (error) => {
          this.showLoading = false;
          console.error('Erro ao atualizar usuário:', error);
        }
      );
    }
  }
  createUser() {
    this.showLoading = true;
    this._router.navigate(['/sign-in'],);
  }
}
