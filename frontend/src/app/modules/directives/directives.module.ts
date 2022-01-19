import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpacerDirective } from './spacer.directive';
import { PlainListDirective } from './plain-list.directive';



@NgModule({
  declarations: [
    SpacerDirective,
    PlainListDirective
  ],
  exports: [
    SpacerDirective,
    PlainListDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
