import { Component, OnInit } from '@angular/core';
import { Marque } from 'src/app/models/marque';
import { MarqueService } from 'src/app/services/MarqueService';
import { ModeleService } from 'src/app/services/ModeleService';

@Component({
  selector: 'app-basic-cards',
  templateUrl: './basic-cards.component.html',
  styleUrls: ['./basic-cards.component.scss']
})
export class BasicCardsComponent implements OnInit {
  
  modeleNameList:any;
  allModelList:any;
  search:any;
  marqueList:any;
  marque:Marque=new Marque();
  nom:string;
  pays:string;
  imageUrl:string;

  constructor(private marqueserive : MarqueService, private modeleservice: ModeleService) { }

  ngOnInit() {
    this.marqueserive.getMarqueList().subscribe((res)=> {
      this.marqueList=res;
    });

    this.modeleservice.getMoldeleList().subscribe((res)=> {
      this.allModelList=res;
    });

    this.search="";
  }


  onSearch(event: Event){
    this.search = (<HTMLInputElement>event.target).value
    console.log("testTest");
    for (let m in this.allModelList){
      console.log(m);
    }
  }

  // onSearch(event: Event){
  //   this.search = (<HTMLInputElement>event.target).value
  //   this.modeleservice.getModelsByName(this.search).subscribe((res)=> {
  //     console.log("testTest");
  //     console.log(this.search);
  //     this.modeleNameList=res;
  //   });
  // }

  onBool(){
    return this.search=="";
  }

}
