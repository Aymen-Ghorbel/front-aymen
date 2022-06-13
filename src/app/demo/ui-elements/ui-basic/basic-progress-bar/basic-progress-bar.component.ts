import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { GlobalVariables } from 'src/app/common/global-variables';
import { clientService } from 'src/app/services/clientService';
import { creditService } from 'src/app/services/creditService';
import { ModeleService } from 'src/app/services/ModeleService';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-basic-progress-bar',
  templateUrl: './basic-progress-bar.component.html',
  styleUrls: ['./basic-progress-bar.component.scss']
})
export class BasicProgressBarComponent implements OnInit {
  public stripAnimation: boolean;

  model: any;
  credit: any;
  idModel: any;
  idCredit: any;
  idBrand: any;
  client: any;

  DureeRemboursementValue:any;
  revenuClient:any;
  mensualite:any;
  AgeClient:any;
  email:any;
 
  Montant:any;

  percentage: number;

  selectedFile: any;
  fileName = '';
  uploadSub: any;
  uploadProgress: number;

  constructor(private globalVar: GlobalVariables, private creditS: creditService, private modelS: ModeleService, private clientS: clientService, private route1: Router, private http: HttpClient) {
    this.stripAnimation = true;
  }

  ngOnInit() {

 

    console.log('idCredit inlocal storage: ',localStorage.getItem("idCredit"));
    console.log('credit in local storage: ',localStorage.getItem("credit"));
    console.log('model in local storage: ',localStorage.getItem("model"));

    this.idCredit = +localStorage.getItem("idCredit");
    this.idBrand = +localStorage.getItem("idBrand");

    this.client= JSON.parse(localStorage.getItem("client"));
    // this.clientS.getClientById().subscribe((res:any)=>{
    //   this.client=res;
    //   console.log('client: ',res);
    // });

   
    this.model = JSON.parse(localStorage.getItem("model"));
    this.idModel = this.model.id;
    // this.modelS.getModele(9).subscribe((res) => {
    //   this.model = res;
    //   console.log('modele: ',this.model);
    // });


    // this.credit = JSON.parse(localStorage.getItem("credit"));
    // this.idCredit = this.credit.id;

    this.creditS.getCreditById(this.idCredit).subscribe(
      
      (res)=>{
        this.credit=res;
        console.log('get credit',this.credit);
        this.percentage=this.progressPercentage(this.credit.status);
        console.log('percentage: ',this.percentage);
      }
    );

  }

  progressPercentage(status: any){
    switch (status) {
      case "En attend":
          return 0;
      case "En attend de document domiciliation de salaire":
          return 25;
      case "En cours de traitement":
          return 50; 
    }
  }

  continuer(){
    this.route1.navigate(['/','basic','cards','modelsByBrand',this.idBrand,'details',this.idModel,'credit',this.idCredit,'upload']);  
  }
 
  onFileSelected(event) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("imageFile", file);
        formData.append("id", this.idCredit);

        // this.http.post("http://20.67.133.33:8080/uploadImage", formData).subscribe(
        //   ()=>{},
        //   (res)=>{
        //     console.log('upload',res);
        //     this.creditS.avancementWorkflow(this.idCredit).subscribe(
        //       ()=>{},
        //       (res)=>{
        //       console.log('avancement workflow',res);
        //       });
        //   }
        // );

        const upload$ = this.http.post("http://20.67.133.33:8080/uploadImage", formData, {
          reportProgress: true,
          observe: 'events'
        })
        .pipe(
          finalize(()=>this.reset())
        );
    
        this.uploadSub = upload$.subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
        })
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

  envoyer(){
    this.creditS.avancementWorkflow(this.idCredit).subscribe(
            ()=>{},
            (res)=>{
            console.log('avancement workflow',res);
            });
  }

  reloadCurrentPage() {
    window.location.reload();
   }

}
