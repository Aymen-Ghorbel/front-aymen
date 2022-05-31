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
  idBrand: number;
  token: string;
  idCredit: number;
  simulationDt;
  loading = true;
  autoFinancement: any;
  dureeRemboursement: any;

  constructor(private modeleservice: ModeleService, private route: ActivatedRoute, private route2: Router, private creditS: creditService) { }

  ngOnInit() {
    this.modeleservice.emptyCredit().subscribe((res) => {
      this.token = res;
      console.log(res);
    })
    this.idModel = this.route.snapshot.params['idModel'];
    this.idBrand = this.route.snapshot.params['idBrand'];
    this.modeleservice.getModele(this.idModel).subscribe((res) => {
      this.model = res;
    });
  }

   padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  };
  
   formatDate(date: Date) {
    return (
      [
        this.padTo2Digits(date.getDate()),
        this.padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join('-') +
      ' ' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  };
  

  onInputAutoFinancement(event: Event) {
    this.autoFinancement = (<HTMLInputElement>event.target).value;
  };

  onInputDureeRemboursement(event: Event) {
    this.dureeRemboursement = (<HTMLInputElement>event.target).value;
  };

  simulation() {
    var formData: any = new FormData();

    formData.append('PrixVoiture', this.model.prix);
    formData.append('AgeVoiture', '0');
    formData.append('AutoFinancement', this.autoFinancement);
    formData.append('PuissanceFiscale', this.model.puissanceFiscale);
    formData.append('DureeRemboursement', this.dureeRemboursement);
    formData.append('Montant', this.model.prix - this.autoFinancement);
    formData.append('status',"En attend");
    formData.append('date',this.formatDate(new Date()));

    this.creditS.setCredit(formData).subscribe(
      () => { },
      () => {
        this.creditS.getCredit().subscribe(credits => {
          const lastCredit = credits[credits.length - 1];
          this.creditS.setCamunda(lastCredit.id,this.model.prix-this.autoFinancement).subscribe(() => {
            console.log('montant',this.model.prix-this.autoFinancement);
            this.creditS.getCredit().subscribe(credits => {
              this.simulationDt = credits[credits.length - 1].simulation;
              this.idCredit = credits[credits.length - 1].id;
              this.loading = false;
            });
          });
        });
      });
  }

  goPlaces() {
    // this.route2.navigate(['/', 'forms', 'basic']);
    this.route2.navigate(['/','basic','cards','modelsByBrand',this.idBrand,'details',this.idModel,'credit',this.idCredit]);
  }
}
