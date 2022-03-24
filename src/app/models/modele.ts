import { Marque } from "./marque";

export class Modele {

    id: number;
    nom: String;
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
    marque : Marque;
}