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
  fileName1 = '';
  fileName2 = '';
  fileName3 = '';
  fileName4 = '';
  fileName5 = '';
  fileName6 = '';
  contractFileName = '';
  uploadSub: any;
  uploadProgress: number;
  status: any;
  show: boolean;
  uploadResponseStatus = 0;
  uploadDomiciliationLoading = true;
  uploadLoading = false;
  test = false;
  disableSendDomiciliation = true;
  contractReceived = false;

  selectedFile1: any;
  selectedFile2: any;
  selectedFile3: any;
  selectedFile4: any;
  selectedFile5: any;
  selectedFile6: any;
  selectedContractFile: any;

  constructor(private creditS: creditService, private modelS: ModeleService, private clientS: clientService, private route1: Router, private http: HttpClient) {
    this.stripAnimation = true;
  }

  ngOnInit() {

 

    console.log('idCredit inlocal storage: ', localStorage.getItem("idCredit"));
    console.log('credit in local storage: ', localStorage.getItem("credit"));
    console.log('model in local storage: ', localStorage.getItem("model"));
    console.log('generated list id in local storage: ', localStorage.getItem("idGeneratedList"));
    console.log('show: ',this.show);
    console.log('resp stat: ',this.uploadResponseStatus);
    console.log('loading: ',this.uploadLoading);

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
        this.showButton();
        console.log('show: ',this.show);
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
      case "En cours":
          return 60; 
      case "en attente des documents":
          return 75; 
    }
  }

  continuer(){
    this.route1.navigate(['/','basic','cards','modelsByBrand',this.idBrand,'details',this.idModel,'credit',this.idCredit,'upload']);  
  }
 
  // domiciliation de salaire Upload start
  onFileSelected(event) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("imageFile", file);
        formData.append("id", this.idCredit);

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
            this.uploadDomiciliationLoading=false;
            if (this.uploadProgress==100){
              this.disableSendDomiciliation = false;
            }
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

  startLoading(){
    this.uploadDomiciliationLoading = true;
  }

  //domiciliation de salaire Upload end


  //docs upload start
  onFileSelected1(event) {
    console.log('selected 1 before',this.selectedFile1);
    this.selectedFile1 = event.target.files[0];
    console.log('selected 1 after',this.selectedFile1);
    const file:File = event.target.files[0];
    if (file) {
      this.fileName1 = file.name;
      console.log('file name 1',this.fileName1);
    }
  }
  onFileSelected2(event) {
    this.selectedFile2 = event.target.files[0];
    const file:File = event.target.files[0];
    console.log('selected 2 after',this.selectedFile1);
    if (file) {
      this.fileName2 = file.name;
    }
  }
  onFileSelected3(event) {
    this.selectedFile3 = event.target.files[0];
    const file:File = event.target.files[0];
    if (file) {
      this.fileName3 = file.name;
    }
  }
  onFileSelected4(event) {
    this.selectedFile4 = event.target.files[0];
    const file:File = event.target.files[0];
    if (file) {
      this.fileName4 = file.name;
    }
  }
  onFileSelected5(event) {
    this.selectedFile5 = event.target.files[0];
    const file:File = event.target.files[0];
    if (file) {
      this.fileName5 = file.name;
    }
  }
  onFileSelected6(event) {
    this.selectedFile6 = event.target.files[0];
    const file:File = event.target.files[0];
    if (file) {
      this.fileName6 = file.name;
    }
  }

  onDocsUpload(){
    let fdDocs = new FormData();
    let fdTimbre = new FormData();
    let param = "timbre_fiscale";

    this.uploadLoading = true;

    fdDocs.append('id',localStorage.getItem("idGeneratedList"));
    fdDocs.append('FichPaie1',this.selectedFile1);
    fdDocs.append('FichPaie2',this.selectedFile2);
    fdDocs.append('FichPaie3',this.selectedFile3);
    fdDocs.append('AttestationSalaire',this.selectedFile4);
    fdDocs.append('AttestationTravail',this.selectedFile5);

    fdTimbre.append(param,this.selectedFile6);
    fdTimbre.append('id',this.idCredit);

    this.creditS.DocsUpload(fdDocs).subscribe(
      ()=>{},
      (res)=>{
      console.log('upload docs: ',res);   
      this.creditS.TimbreFiscaleUpload(fdTimbre).subscribe(
        ()=>{},
        (res)=>{
        console.log('upload Timbre fiscale: ',res);   
        console.log('status ',res.status);   
        this.uploadResponseStatus = res.status;
        console.log('test status 200',this.uploadResponseStatus==200);
        // this.percentage=80;
        });   
      });
    
  }
  //docs upload end

  //contract upload start
  onContractSelected(event) {
    this.contractFileName = event.target.files[0];
    const file:File = event.target.files[0];
    if (file) {
      this.contractFileName = file.name;
    }
  }

  //unfinished contract upload method
  onContractUpload(){
    let fdDocs = new FormData();

    this.uploadLoading = true;

    fdDocs.append('id',this.idCredit);
    fdDocs.append('Contrat',this.selectedContractFile);

    //service subscription
    
  }


 

  // onFileUpload(){
  
  //   let url="http://20.67.133.33:8080/uploadDoc";
   

  //   let fd = new FormData();

  //   fd.append('id',this.idCredit);
  //   fd.append('FichPaie1',this.selectedFile1);
  //   fd.append('FichPaie2',this.selectedFile2);
  //   fd.append('FichPaie3',this.selectedFile3);
  //   fd.append('AttestationSalaire',this.selectedFile4);
  //   fd.append('AttestationTravail',this.selectedFile5);
    

  //   return this.http.post(url,fd).subscribe(
  //     ()=>{},
  //     (res)=>{
  //     console.log('upload docs: ',res);
      
  //     });
  // }


  //docs upload end

 

  reloadCurrentPage() {
    window.location.reload();
   }

  showButton() {
    this.status = this.credit.status;
    console.log('En attend: ', this.status == 'En attend');
    console.log('En attend de document domiciliation de salaire: ', this.status == 'En attend de document domiciliation de salaire');
    this.show = (this.status == 'En attend') || (this.status == 'En attend de document domiciliation de salaire')
  }

  correctStatus(): any {
    switch (this.credit.status) {
      case "En attend": {
        return "En attente";
      }
      case "En attend de document domiciliation de salaire": {
        return "En attente de document domiciliation de salaire";
      }
      case "En cours de traitement": {
        return "En cours de traitement..."; 
      }
      case "En cours": {
        return "En cours de traitement..."; 
      }
      case "en attente des documents": {
        return "En attente des documents..."; 
      }
    };
  }
  

}
