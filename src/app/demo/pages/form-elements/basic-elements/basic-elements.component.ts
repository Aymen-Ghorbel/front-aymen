import { Component, OnInit } from '@angular/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import{Modal} from 'bootstrap';
import { GlobalVariables } from 'src/app/common/global-variables';
import { Modele } from 'src/app/models/modele';
import { clientService } from 'src/app/services/clientService';
import { creditService } from 'src/app/services/creditService';
import {ModeleService} from 'src/app/services/ModeleService';
import { TblBootstrapModule } from '../../tables/tbl-bootstrap/tbl-bootstrap.module';


@Component({
  selector: 'app-basic-elements',
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.scss']
})
export class BasicElementsComponent implements OnInit {

  model: any;
  credit: any;
  idModel: number;
  idCredit: number;
  idBrand: number;
  client: any;

  DureeRemboursementValue:any;
  revenuClient:any;
  mensualite:any;
  AgeClient:any;
  email:any;
 
  Montant:any;

  testModal : Modal | undefined;
  constructor(private modelservice : ModeleService, private creditS : creditService, private clientS : clientService, private globalVar: GlobalVariables , private route: ActivatedRoute, private route2: Router) { }

 
  
  ngOnInit() {
    this.idModel = this.route.snapshot.params['idModel'];
    this.idCredit = this.route.snapshot.params['idCredit'];
    this.idBrand = this.route.snapshot.params['idBrand'];

    localStorage.setItem("idModel", String(this.idModel));
    localStorage.setItem("idCredit", String(this.idCredit));
    localStorage.setItem("idBrand", String(this.idBrand));

    this.modelservice.getModele(this.idModel).subscribe((res) => {
      this.model = res;
      localStorage.removeItem('model');
      localStorage.setItem("model",JSON.stringify(this.model));
      console.log(this.model);
      console.log('id model in local storage: ',localStorage.getItem("model"));
    });

    this.creditS.getCreditById(this.idCredit).subscribe((res)=>{
      console.log('this credit',res);
      this.credit=res;
      localStorage.removeItem('credit');
      localStorage.setItem("credit",JSON.stringify(this.credit));
      console.log('credit in local storage: ',localStorage.getItem("credit"));


    })

   this.clientS.getClientById().subscribe((res:any)=>{
    this.client=res;
    localStorage.setItem("client",JSON.stringify(this.client));
    console.log('client in local storage: ',localStorage.getItem("client"));
    console.log(res);
  });
  }



  acceptCredit(){
    
    this.creditS.acceptSimulation(this.idCredit).subscribe(
      ()=>{},
      (res)=>{
      console.log('accept simulation',res);
      
      this.creditS.generateList(this.idCredit).subscribe(
      ()=>{},
      (res)=>{
        console.log('list generation', res.error.text);
        this.route2.navigate(['/','basic','progress']);
      }
      )
       });

    

        
    // this.route2.navigate(['/','basic','cards','modelsByBrand',this.idBrand,'details',this.idModel,'credit',this.idCredit,'upload']);    
   
  }

}
