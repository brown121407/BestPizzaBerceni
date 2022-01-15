import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PNFComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    PNFComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PNFComponent
  ]
})
export class ErrorsModule { }
