import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BasicModelsComponent} from './basic-models.component';

const routes: Routes = [
  {
    path: '',
    component: BasicModelsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicModelsRoutingModule { }
