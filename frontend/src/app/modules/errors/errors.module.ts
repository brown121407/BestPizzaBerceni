import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors-routing.module';
import { PNFComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    PNFComponent
  ],
  imports: [
    CommonModule,
    ErrorsRoutingModule
  ],
  exports: [
    PNFComponent
  ]
})
export class ErrorsModule { }
