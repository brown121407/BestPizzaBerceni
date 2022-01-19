import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { IAddress, IAddressUpdate } from "../../../models/address";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private httpClient: HttpClient) { }

  getAddresses(): Observable<IAddress[]> {
    return this.httpClient.get<IAddress[]>(`${environment.apiUrl}/addresses/`, {withCredentials: true});
  }

  addAddress(address: IAddressUpdate) {
    return this.httpClient.post(`${environment.apiUrl}/addresses/`, address);
  }

  getAddressById(id: number): Observable<IAddress> {
    return this.httpClient.get<IAddress>(`${environment.apiUrl}/addresses/` + id.toString());
  }

  deleteAddressById(idAddress: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/addresses/` + idAddress.toString());
  }

  updateAddress(id: number, address: IAddressUpdate) {
    return this.httpClient.put(`${environment.apiUrl}/addresses/${id}`, address);
  }

  deleteAddress(idAddress: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/addresses/` + idAddress.toString());
  }
}
