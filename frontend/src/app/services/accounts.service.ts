import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUserSignup} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  constructor(private httpClient: HttpClient) { }

  signUp(user: IUserSignup): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/accounts/register`, user);
  }
}
