import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IngredientService} from "../../services/ingredient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IIngredient} from "../../../../models/ingredient";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ingredient-update',
  templateUrl: './ingredient-update.component.html',
  styleUrls: ['./ingredient-update.component.css']
})
export class IngredientUpdateComponent implements OnInit {
  ingredient!: IIngredient;
  isLoading: boolean = false;
  id!: number;

  formGroup: FormGroup = new FormGroup({
    'id' : new FormControl(0, Validators.required),
    'name': new FormControl('', Validators.required),
    'spicy': new FormControl(false),
    'allergen': new FormControl(false)
  });

  constructor(
    private ingredientService: IngredientService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr:ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.isLoading = true;
    this.ingredientService.getIngredient(this.id).subscribe((ingredient: IIngredient) => {
      this.ingredient = ingredient;
      this.formGroup = this.fb.group({
        id: [this.ingredient?.id, Validators.required],
        name: [this.ingredient?.name, Validators.required],
        spicy: this.ingredient?.spicy,
        allergen: this.ingredient?.allergen
      });

      this.isLoading = false;
    });
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  addIngred(): void {
    this.ingredientService.addIngredient(this.formGroup.value);
  }

  updateIngred():void {
    this.isLoading = true;
    if(typeof(this.formGroup.getRawValue()) != "undefined" ) {
      this.ingredientService.updateIngredient(this.formGroup.value).subscribe({
        next: (_) => {
          this.isLoading = false;
          this.toastr.success('Successfully updated ingredient!');
          this.goToPage(`/ingredients/list`);
        },
        error: (err: any) => this.toastr.error(JSON.stringify(err))
      })
    }
  }

}
