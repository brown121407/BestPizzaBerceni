import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IngredientService} from "../../services/ingredient.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ingredient-page',
  templateUrl: './ingredient-page.component.html',
  styleUrls: ['./ingredient-page.component.css']
})
export class IngredientPageComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'spicy': new FormControl(false),
    'allergen': new FormControl(false)
  });
  isLoading = false;

  constructor(private ingredientService: IngredientService, private router: Router, private toastr: ToastrService ) { }

  ngOnInit(): void { }

  goToPage(pageName: string){
    this.router.navigate([`${pageName}`]);
  }

  addIngred(): void{
    this.isLoading = true;
    this.ingredientService.addIngredient(this.formGroup.value)
      .subscribe({
        next: (_) => {
          this.isLoading = false;
          this.toastr.success("Ingredient added successfully");
          this.goToPage(`/ingredients/list`);
        },
        error: (_) => {
          this.isLoading = false;
        }
      });
  }
}
