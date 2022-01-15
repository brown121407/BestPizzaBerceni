import { Injectable } from '@angular/core';
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { IIngredient } from "../../../models/ingredient";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
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
    return this.httpClient.put(`${environment.apiUrl}/ingredients/` + ingredient.id.toString(), ingredient);
  }
}
