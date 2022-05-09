import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Marque } from 'src/app/models/marque';
import { Modele } from 'src/app/models/modele';
import { ModeleService } from 'src/app/services/ModeleService';
import { creditService } from 'src/app/services/creditService';


@Component({
  selector: 'app-basic-modal',
  templateUrl: './basic-modal.component.html',
  styleUrls: ['./basic-modal.component.scss']
})
export class BasicModalComponent implements OnInit {

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
  constructor(private modeleservice : ModeleService, private route: ActivatedRoute, private route2: Router, private creditS : creditService) { }

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

simulation() {
  this.creditS.setCredit(
    {"clientId":1,
    "creditId":75,
    "duree":200,
   "revenu":2800,
  "age":35,
   "email":"nidhal.rihane@ensi-uma.tn",   
   "montant":50000,
}).subscribe((res)=> {
  console.log('setCredit')
  console.log(res);

  this.creditS.getSimulation(75).subscribe((res)=> {
    console.log('getSimulation')
    console.log(res);
 });

});

}

goPlaces() {
  
  this.route2.navigate(['/', 'forms','basic']);
}

}
