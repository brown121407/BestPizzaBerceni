import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IngredientService} from "../../services/ingredient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IIngredient} from "../../models/ingredient";
import {ToastrService} from "ngx-toastr";
import {IUser} from "../../models/user";

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

  constructor(private ingredientService: IngredientService, private router: Router, private route: ActivatedRoute, private toastr:ToastrService, private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getIngredient();
    this.ingredientService.getIngredient(this.id).subscribe((_) => {
      this.formGroup = this.fb.group({
        id: [this.ingredient?.id, Validators.required],
        name: [this.ingredient?.name, Validators.required],
        spicy: this.ingredient?.spicy,
        allergen: this.ingredient?.allergen
      });
    })

  }

  goToPage(pageName: string){
    this.router.navigate([`${pageName}`]);
  }

  addIngred(): void{
    this.ingredientService.addIngredient(this.formGroup.value);
  }

  getIngredient(): void{
    this.isLoading = true;
    this.ingredientService.getIngredient(this.id).subscribe({
      next: (ingred: IIngredient) => {
        this.ingredient = ingred;
        this.isLoading = false;
      },
      error: (_) => {
        this.isLoading = false;
      }
    });
  }

  updateIngred():void{
    this.isLoading = true;
    if(typeof(this.formGroup.getRawValue()) != "undefined" ) {
      this.ingredientService.updateIngredient(this.formGroup.value).subscribe({
        next: (_) => {
          this.toastr.success('Successfully updated ingredient!');
          this.goToPage(`/ingredient`);
        },
        error: (err: any) => this.toastr.error(JSON.stringify(err)),
        complete: () => {
          this.isLoading = false;
          this.goToPage(`/ingredient`);
        }
      })
    }
  }

}
