import { Component, OnInit } from '@angular/core';
import { Marque } from 'src/app/models/marque';
import { MarqueService } from 'src/app/services/MarqueService';

@Component({
  selector: 'app-basic-cards',
  templateUrl: './basic-cards.component.html',
  styleUrls: ['./basic-cards.component.scss']
})
export class BasicCardsComponent implements OnInit {
  marqueList:any;
  marque:Marque=new Marque();
  nom:string;
  pays:string;
  imageUrl:string;
  constructor(private marqueserive : MarqueService) { }

  ngOnInit() {
    this.marqueserive.getMarqueList().subscribe((res)=> {
      this.marqueList=res;
  });

}
}
