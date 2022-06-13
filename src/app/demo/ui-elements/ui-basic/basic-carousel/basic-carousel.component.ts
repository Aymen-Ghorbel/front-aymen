import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { creditService } from 'src/app/services/creditService';

@Component({
  selector: 'app-basic-carousel',
  templateUrl: './basic-carousel.component.html',
  styleUrls: ['./basic-carousel.component.scss']
})
export class BasicCarouselComponent implements OnInit {

  selectedFile = null;
  idCredit: any;
  idModel: any;
  idBrand: any;

  constructor(private creditS: creditService, private http: HttpClient, private route: ActivatedRoute, private route2: Router) { }

  ngOnInit() {
    this.idCredit=this.route.snapshot.params['idCredit'];
    this.idBrand=this.route.snapshot.params['idBrand'];
    this.idModel=this.route.snapshot.params['idModel'];
  }

  onFileSelected(event){
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  onFileUpload(){
    let fd = new FormData();
    fd.append('imageFile',this.selectedFile);
    fd.append('id',this.idCredit);
    this.http.post("http://20.67.133.33:8080/uploadImage",fd).subscribe(
      ()=>{},
      (res)=>{
        console.log('upload',res);
        this.creditS.avancementWorkflow(this.idCredit).subscribe(
          ()=>{},
          (res)=>{
          console.log('avancement workflow',res);
          this.route2.navigate(['/','basic','cards','modelsByBrand',this.idBrand,'details',this.idModel,'credit',this.idCredit,'upload','docs']);
        });
      });
  }

}
