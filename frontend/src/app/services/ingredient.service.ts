import { Injectable } from '@angular/core';
import {IIngredient} from "../models/ingredient";
import {Observable, tap} from "rxjs";
import {IUser} from "../models/user";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {stringify} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private url: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getIngredients(): Observable<IIngredient[]>{
    return this.httpClient.get<IIngredient[]>(`${environment.apiUrl}/ingredients`, { withCredentials: true });
  }

  addIngredient(ingredient :IIngredient){
    return this.httpClient.post(`${environment.apiUrl}/ingredients`, ingredient);
  }
  getIngredient(ingredientId : number): Observable<IIngredient>{
    return this.httpClient.get<IIngredient>(`${environment.apiUrl}/ingredients/` + ingredientId.toString())
  }
  deleteIngredient(ingredientId : number): Observable<any>{
    return this.httpClient.delete(`${environment.apiUrl}/ingredients/` + ingredientId.toString())
  }
  updateIngredient(ingredient: IIngredient): Observable<any> {
    console.log(ingredient);
    return this.httpClient.put(`${environment.apiUrl}/ingredients/` + ingredient.id.toString(), ingredient);
  }
}
