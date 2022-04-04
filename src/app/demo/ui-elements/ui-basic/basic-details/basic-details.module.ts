import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicDetailsRoutingModule } from './basic-details-routing.module';
import { BasicDetailsComponent } from './basic-details.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbPopoverModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    BasicDetailsRoutingModule,
    SharedModule,
    NgbPopoverModule,
    NgbTooltipModule
  ],
  
 // exports: [BasicDetailsComponent],
 // declarations: [BasicDetailsComponent]
})
export class BasicDetailsModule { }
