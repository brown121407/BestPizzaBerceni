import { Component, OnInit } from '@angular/core';
import {IIngredient} from "../../../../models/ingredient";
import {IngredientService} from "../../services/ingredient.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  ingredients: IIngredient[] = [];

  hasChanged: boolean = false;

  constructor(private ingredientService: IngredientService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe((res: IIngredient[])  => this.ingredients = res);
  }

  modifyIngredients(): void {
    this.hasChanged = true;
  }

  emptyIngredients(): void {
    this.ingredients = [];
    this.hasChanged = true;
  }

  goToPage(pageName: string){
    this.router.navigate([`${pageName}`]);
  }

  deleteIngred(id: number){
    this.ingredientService.deleteIngredient(id).subscribe((_) =>
      {
        this.toastr.success("Ingredient deleted successfully");
        this.ingredients = this.ingredients.filter((ingred: IIngredient) => ingred.id !== id);
      }
    );
  }
}
