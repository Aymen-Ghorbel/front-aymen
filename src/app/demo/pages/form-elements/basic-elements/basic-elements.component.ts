import { Component, OnInit } from '@angular/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import{Modal} from 'bootstrap';
import { Modele } from 'src/app/models/modele';
import { clientService } from 'src/app/services/clientService';
import { creditService } from 'src/app/services/creditService';
import {
  ModeleService
} from 'src/app/services/ModeleService';
import { TblBootstrapModule } from '../../tables/tbl-bootstrap/tbl-bootstrap.module';
@Component({
  selector: 'app-basic-elements',
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.scss']
})
export class BasicElementsComponent implements OnInit {

  model: any;
  idModel: number;
  idCredit: number;
  client: any;
  ClientId:any;
  DureeRemboursementValue:any;
  revenuClient:any;
  mensualite:any;
  AgeClient:any;
  email:any;
 
  Montant:any;

  testModal : Modal | undefined;
  constructor(private modelservice : ModeleService, private creditS : creditService, private clientS : clientService, private route: ActivatedRoute,) { }

 
  
  ngOnInit() {
    this.idModel = this.route.snapshot.params['idModel'];
    this.idCredit = this.route.snapshot.params['idCredit'];

    this.modelservice.getModele(this.idModel).subscribe((res) => {
      this.model = res;
      console.log(this.model);
    });

   this.clientS.getClientById().subscribe((res:any)=>{
    this.client=res;
    console.log(res);
  });
  }

  acceptCredit(){
    this.creditS.acceptSimulation(this.idCredit).subscribe((res)=>{
      console.log('accept simulation',res);
    });
  }

}
