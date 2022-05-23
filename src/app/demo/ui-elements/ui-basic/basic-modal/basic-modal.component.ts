import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  Marque
} from 'src/app/models/marque';
import {
  Modele
} from 'src/app/models/modele';
import {
  ModeleService
} from 'src/app/services/ModeleService';
import {
  creditService
} from 'src/app/services/creditService';


@Component({
  selector: 'app-basic-modal',
  templateUrl: './basic-modal.component.html',
  styleUrls: ['./basic-modal.component.scss']
})
export class BasicModalComponent implements OnInit {

  model: any;
  modele: Modele = new Modele();
  nom: string;
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
  token: string;
  simulationInfo;
  simulationDt;
  loading = true;
  constructor(private modeleservice: ModeleService, private route: ActivatedRoute, private route2: Router, private creditS: creditService) {}

  ngOnInit() {

    this.modeleservice.emptyCredit().subscribe((res) => {
      this.token = res;
      console.log(res);
    })
    this.idModel = this.route.snapshot.params['idModel'];
    this.modeleservice.getModele(this.idModel).subscribe((res) => {
      this.model = res;
    });

    //     const formData = new FormData();


    // formData.append('PrixVoiture', this.model.prix);
    // formData.append('AgeVoiture', this.model.age);
    // formData.append('AutoFinancement', this.model.AutoFinancement);
    // formData.append('PuissanceFiscale', this.model.puissanceFiscale);
    // formData.append('DureeRemboursement', this.model.DureeRemboursement);
    // formData.append('AutoFinancement', this.model.a);

  }



  simulation() {
    // Promise.all(([this.creditS.setCredit, this.creditS.setCamunda, this.creditS.getCredit])).then(console.log) !!
      console.log('setCredit');
    this.creditS.setCredit().subscribe((response: any) => {
      console.log(response)
    });


    this.creditS.setCamunda().subscribe((res) => {
      console.log('setCamunda');
      console.log(res);
      console.log('get Credit');
      this.creditS.getCredit();

      //   this.creditS.getSimulation(132).subscribe((res)=> {
      //     this.simulationInfo=res ;
      //     this.simulationDt=this.simulationInfo.simulation;
      //     this.loading=false;
      //     console.log('getSimulation')
      //     console.log(res);
      //  });

    });


  }

  goPlaces() {

    this.route2.navigate(['/', 'forms', 'basic']);
  }

}
