import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiBasicRoutingModule } from './ui-basic-routing.module';
import { BasicModelsComponent } from './basic-models/basic-models.component';

@NgModule({
  imports: [
    CommonModule,
    UiBasicRoutingModule
  ],
  declarations: [BasicModelsComponent]
})
export class UiBasicModule { }
