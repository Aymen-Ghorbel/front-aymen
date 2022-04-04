import { Component, OnInit } from '@angular/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import{Modal} from 'bootstrap';
import { TblBootstrapModule } from '../../tables/tbl-bootstrap/tbl-bootstrap.module';

@Component({
  selector: 'app-basic-elements',
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.scss']
})
export class BasicElementsComponent implements OnInit {

  testModal : Modal | undefined;
  constructor() { }

  ngOnInit() {
  }

  open(){
    // this.testModal = new bootstrap.Modal(document.getElementById('testModal'),{
    //   keyboard: false
    // })
    // this.testModal?.Show();
  }

}
