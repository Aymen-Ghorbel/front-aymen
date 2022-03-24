import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Marque } from 'src/app/models/marque';
import { Modele } from 'src/app/models/modele';
import { MarqueService } from 'src/app/services/MarqueService';
import { ModeleService } from 'src/app/services/ModeleService';

@Component({
  selector: 'app-basic-models',
  templateUrl: './basic-models.component.html',
  styleUrls: ['./basic-models.component.scss']
})
export class BasicModelsComponent implements OnInit {

  modeleList:any;
brand:any
modele:Modele=new Modele();
nom:string;
pays: string;
id: number;
imageUrl: String;
prix: number;
carrosserie: any;
garantie: number;
nbreDePlaces: number;
nbreDeCylindres: number;
energie: any;
puissanceFiscale: number;
boite: any;
nbreDeRapports: number;
transmission: any;
marque: Marque;
idBrand: number;
  constructor(private modeleservice : ModeleService,private marqueService : MarqueService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.idBrand = this.route.snapshot.params['idBrand'];
    this.modeleservice.getModelsByBrand(this.idBrand).subscribe((res)=> {
      this.modeleList=res;
    });

    this.marqueService.getProduct(this.idBrand).subscribe((res)=> {
      this.brand=res;
    });
}

}
