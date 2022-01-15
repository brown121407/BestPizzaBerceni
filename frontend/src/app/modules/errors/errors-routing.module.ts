import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PNFComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
 // { path: 'mama', component: PNFComponent },
  { path: '**', component: PNFComponent }
];

@NgModule({
  //imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
