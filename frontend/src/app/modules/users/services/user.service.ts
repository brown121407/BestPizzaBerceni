import { Injectable } from '@angular/core';
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { IUser } from "../../../models/user";
import {IAddress, IAddressUpdate} from "../../../models/address";
import {IProductVariant, IProductVariantCreate} from "../../../models/product-variant";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<IUser[]>{
    return this.httpClient.get<IUser[]>(`${environment.apiUrl}/users`, { withCredentials: true });
  }
  addUser(user :IUser){
    return this.httpClient.post(`${environment.apiUrl}/users`, user);
  }
  getUser(userId : number): Observable<IUser>{
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/` + userId.toString())
  }
  deleteUser(userId : string): Observable<any>{
    return this.httpClient.delete(`${environment.apiUrl}/users/` + userId.toString())
  }
  updateUser(user: IUser): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/users/` + user.id.toString(), user);
  }

  //For Address
  getAddresses(): Observable<IAddress[]>{
    return this.httpClient.get<IAddress[]>(`${environment.apiUrl}/addresses/`, {withCredentials: true});
  }

  addAddress(address: IAddressUpdate){
    return this.httpClient.post(`${environment.apiUrl}/addresses/`, address);
  }

  getAddressById(id: number): Observable<IAddress>{
    return this.httpClient.get<IAddress>(`${environment.apiUrl}/addresses/` + id.toString());
  }

  deleteAddressById(idAddress: number): Observable<any>{
    return this.httpClient.delete(`${environment.apiUrl}/addresses/` + idAddress.toString());
  }

  updateAddress(id: number, address: IAddressUpdate){
    return this.httpClient.put(`${environment.apiUrl}/addresses/${id}`, address);
  }

  deleteAddress(idAddress: number): Observable<any>{
    return this.httpClient.delete(`${environment.apiUrl}/addresses/` + idAddress.toString());
  }





}
