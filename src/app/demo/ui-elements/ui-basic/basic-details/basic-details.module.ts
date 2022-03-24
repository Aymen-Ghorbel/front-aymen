import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicDetailsRoutingModule } from './basic-details-routing.module';
import { BasicDetailsComponent } from './basic-details.component';
import {SharedModule} from '../../../../theme/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    BasicDetailsRoutingModule,
    SharedModule
  ],
  exports: [BasicDetailsComponent],
  declarations: [BasicDetailsComponent]
})
export class BasicDetailsModule { }
