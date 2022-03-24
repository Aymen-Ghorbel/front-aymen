import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicModelsRoutingModule } from './basic-models-routing.module';
import { BasicModelsComponent } from './basic-models.component';
import {SharedModule} from '../../../../theme/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    BasicModelsRoutingModule,
    SharedModule
  ],
  exports: [BasicModelsComponent],
  declarations: [BasicModelsComponent]
})
export class BasicModelsModule { }
