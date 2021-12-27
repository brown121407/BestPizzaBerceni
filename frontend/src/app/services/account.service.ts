import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, of, switchMap, tap} from "rxjs";
import {IUser, IUserLogin, IUserSignup} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSubject: BehaviorSubject<IUser | null>;

  currentUser$: Observable<IUser | null>;

  get currentUser(): IUser | null {
    return this.currentUserSubject.value;
  }

  constructor(private httpClient: HttpClient) {
    const userJson = localStorage.getItem('user');
    this.currentUserSubject = new BehaviorSubject<IUser | null>(userJson ? JSON.parse(userJson) : null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  signUp(user: IUserSignup): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/accounts/register`, user);
  }

  login(user: IUserLogin): Observable<IUser> {
    return this.httpClient.post(`${environment.apiUrl}/accounts/login`, user, { responseType: 'text' })
      .pipe(
        switchMap((token: string) => {
          console.log(token);
          localStorage.setItem('token', token);
          return this.me();
        }),
        map((me: Partial<IUser>) => {
          localStorage.setItem('user', JSON.stringify(me));
          const user = {
            token: localStorage.getItem('token')!,
            ...me
          } as IUser;
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  me(): Observable<Partial<IUser>> {
    return this.httpClient.get<IUser>(`${environment.apiUrl}/accounts/me`, { withCredentials: true });
  }
}
