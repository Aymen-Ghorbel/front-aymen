import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-basic-badge',
  templateUrl: './basic-badge.component.html',
  styleUrls: ['./basic-badge.component.scss']
})
export class BasicBadgeComponent implements OnInit {

  urlGenerateList="http://20.67.133.33:8080/genereListDoc"
  selectedFile1: any;
  selectedFile2: any;
  selectedFile3: any;
  selectedFile4: any;
  selectedFile5: any;
  selectedFile6: any;
  // idCredit: any;
  type='Automobile';
  listGenerated: any;
  idList: any;
  idCredit: any;

  constructor(private http : HttpClient, private route : ActivatedRoute) { }

  ngOnInit() {
    this.idCredit=this.route.snapshot.params['idCredit'];
  
  }

  onFileSelected1(event){
    console.log(event);
    console.log("selected File 1 before",this.selectedFile1);
    this.selectedFile1 = event.target.files[0];
    console.log("selected File 1",this.selectedFile1.name);
  }
  onFileSelected2(event){
    console.log(event);
    this.selectedFile2 = event.target.files[0];
    console.log("selected File 2",this.selectedFile2);
  }
  onFileSelected3(event){
    console.log(event);
    this.selectedFile3 = event.target.files[0];
    console.log("selected File 3",this.selectedFile3);
  }
  onFileSelected4(event){
    console.log(event);
    this.selectedFile4 = event.target.files[0];
    console.log("selected File 4",this.selectedFile4);
  }
  onFileSelected5(event){
    console.log(event);
    this.selectedFile5 = event.target.files[0];
    console.log("selected File 5",this.selectedFile5);
  }
  onFileSelected6(event){
    console.log(event);
    this.selectedFile6 = event.target.files[0];
    console.log("selected File 6",this.selectedFile6);
  }

  onFileUpload(){
  
    let url="http://20.67.133.33:8080/uploadDoc";
   

    let fd = new FormData();

    fd.append('id',this.idCredit);
    fd.append('FichPaie1',this.selectedFile1);
    fd.append('FichPaie2',this.selectedFile2);
    fd.append('FichPaie3',this.selectedFile3);
    fd.append('AttestationSalaire',this.selectedFile4);
    fd.append('AttestationTravail',this.selectedFile5);
    

    return this.http.post(url,fd).subscribe((res)=>{console.log('upload',res)});
  }
  // onFileUpload2(){
  
  //   let url="http://20.67.133.33:8080/uploadFichPaie2";
  //   let param = "FichPaie2";

  //   let fd = new FormData();

  //   fd.append(param,this.selectedFile1);
  //   fd.append('id',this.idCredit);

  //   return this.http.put(url,fd).subscribe((res)=>{console.log('upload',res)});
  // }
  // onFileUpload3(){
  
  //   let url="http://20.67.133.33:8080/uploadFichPaie3";
  //   let param = "FichPaie3";

  //   let fd = new FormData();

  //   fd.append(param,this.selectedFile1);
  //   fd.append('id',this.idCredit);

  //   return this.http.put(url,fd).subscribe((res)=>{console.log('upload',res)});
  // }
  // onFileUpload4(){
  
  //   let url="http://20.67.133.33:8080/uploadAttestationSalaire";
  //   let param = "AttestationSalaire";

  //   let fd = new FormData();

  //   fd.append(param,this.selectedFile1);
  //   fd.append('id',this.idCredit);

  //   return this.http.put(url,fd).subscribe((res)=>{console.log('upload',res)});
  // }
  // onFileUpload5(){
  
  //   let url="http://20.67.133.33:8080/uploadAttestationTravail";
  //   let param = "AttestationTravail";

  //   let fd = new FormData();

  //   fd.append(param,this.selectedFile1);
  //   fd.append('id',this.idCredit);

  //   return this.http.put(url,fd).subscribe((res)=>{console.log('upload',res)});
  // }
  // onFileUpload6(){
  
  //   let url="http://20.67.133.33:8080/uploadtimbre_fiscale";
  //   let param = "timbre_fiscale";

  //   let fd = new FormData();

  //   fd.append(param,this.selectedFile1);
  //   fd.append('id',this.idCredit);

  //   return this.http.put(url,fd).subscribe((res)=>{console.log('upload',res)});
  // }
}



