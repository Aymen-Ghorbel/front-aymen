import { Component, OnInit } from '@angular/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import{Modal} from 'bootstrap';
import { creditService } from 'src/app/services/creditService';
import { TblBootstrapModule } from '../../tables/tbl-bootstrap/tbl-bootstrap.module';
@Component({
  selector: 'app-basic-elements',
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.scss']
})
export class BasicElementsComponent implements OnInit {

  ClientId:any;
  DureeRemboursementValue:any;
  revenuClient:any;
  mensualite:any;
  AgeClient:any;
  email:any;
 
  Montant:any;

  testModal : Modal | undefined;
  constructor(private creditS : creditService) { }

 
  
  ngOnInit() {
   
  }

  simulation() {
    this.creditS.setCredit(
      {"clientId":2,
      "creditId":75,
      "duree":this.DureeRemboursementValue,
     "revenu":this.revenuClient,
     "age":this.AgeClient,
     "email":this.email,   
     "montant":this.Montant,
  }).subscribe((res)=> {
     console.log(res);
  });
  }

  open(){
    // this.testModal = new bootstrap.Modal(document.getElementById('testModal'),{
    //   keyboard: false
    // })
    // this.testModal?.Show();
  }

}
