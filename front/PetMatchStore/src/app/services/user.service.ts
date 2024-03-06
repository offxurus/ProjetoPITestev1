import { HttpClient }                             from '@angular/common/http';
import { Injectable }                             from '@angular/core';
import { Observable }                             from 'rxjs';
import { environment }                            from 'src/environments/environment';
import { ListUser, User, UserSignIn}  from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<ListUser>{
    return new Observable<ListUser>((observer)=> {
      this.http.get<ListUser>(`${environment.apiUrl}/users`).subscribe(
        (users) => {
          observer.next(users);
          observer.complete();
        },
        () => {
          observer.error('error_list_users');
          observer.complete();
        }
      )
    })
  }

  userSingIn(userParams: User): Observable<UserSignIn> {
    return new Observable<UserSignIn>((observer) => {
      this.http
        .post<UserSignIn>(`${environment.apiUrl}/user-sign-in`, userParams)
        .subscribe(
          (user) => {
            observer.next(user);
            observer.complete();
          },
          () => {
            observer.error('error_on_get_user');
            observer.complete();
          }
        );
    });
  }

  createUser(userParams: User): Observable<User> {
    return new Observable<User>((observer) => {
      this.http.post<User>(`${environment.apiUrl}/users`, userParams).subscribe(
        (user) => {
          observer.next(user);
          observer.complete();
        },
        () => {
          observer.error('error_on_create_user');
          observer.complete();
        }
      );
    });
  }
  updateUser(userParams: User): Observable<User> {
    return new Observable<User>((observer) => {
      this.http.post<User>(`${environment.apiUrl}/users`, userParams).subscribe(
        (user) => {
          observer.next(user);
          observer.complete();
        },
        () => {
          observer.error('error_on_create_user');
          observer.complete();
        }
      );
    });
  }
}
