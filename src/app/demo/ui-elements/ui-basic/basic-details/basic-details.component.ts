import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Marque } from 'src/app/models/marque';
import { Modele } from 'src/app/models/modele';
import { MarqueService } from 'src/app/services/MarqueService';
import { ModeleService } from 'src/app/services/ModeleService';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.scss']
})
export class BasicDetailsComponent implements OnInit {

  model:any;
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
idModel: number;
token :string;
  constructor(private modeleservice : ModeleService, private route: ActivatedRoute, private route2: Router) { }

  ngOnInit() {

    this.modeleservice.emptyCredit().subscribe((res)=>{
      this.token=res;
      console.log(res);
    })
    this.idModel = this.route.snapshot.params['idModel'];
    this.modeleservice.getModele(this.idModel).subscribe((res)=> {
      this.model=res;
    });

}

goPlaces() {
  
  this.route2.navigate(['/', 'forms','basic']);
}

}
