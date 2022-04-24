import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marque } from '../models/marque';


@Injectable({
    providedIn: 'root'
})

export class creditService {

    private baseUrl = "http://20.82.213.22:8080/engine-rest/process-definition/key/PrincipalWorkflow/start";

    constructor(private http: HttpClient) { }

    
    setCredit(paramObject): Observable<Object> {
        var jsonObject = {
            "variables": {
              "ClientId": {"value": paramObject["clientId"], "type": "Integer"},
              "CreditId": {"value": paramObject["creditId"], "type": "Integer"},
              "DureeRemboursement": {
                "value": paramObject["duree"],
                "type": "Integer"
              },
              "revenuClient": {"value": paramObject["revenu"], "type": "Integer"},
              "mensualite": {"value": paramObject["duree"], "type": "Integer"},
              "AgeClient": {"value": paramObject["age"], "type": "Integer"},
              "email": {"value": paramObject["email"], "type": "string"},
              "type": {"value": "automobile", "type": "string"},
              "decision": {"value": true, "type": "Boolean"},
              "Montant": {"value": paramObject["montant"], "type": "Long"}
            },
            "businessKey": "myBusinessKey",
            "withVariablesInReturn": true
          };

          let headers = new HttpHeaders();

           
          return this.http.post(this.baseUrl,jsonObject);
    }
   

    


}
