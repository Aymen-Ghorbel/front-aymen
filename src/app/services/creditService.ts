import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  Observable,
  from
} from 'rxjs';
import {
  Marque
} from '../models/marque';
import {
  RxJSHttpClient
} from 'rxjs-http-client';


@Injectable({
  providedIn: 'root'
})

export class creditService {

  // private baseUrl = "http://20.82.213.22:8080/engine-rest/process-definition/key/PrincipalWorkflow/start";
  private baseUrl = "https://localhost:8243/camunda/1.0.0/engine-rest/process-definition/key/PrincipalWorkflow/start";
  private baseUrlSimulation = "https://localhost:8243/deploy/1.0/CreditAuto";
  private bearerCamunda = "eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZG1pbiIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiWG5SakJLYnNTOFJBUDN2UGNSMWtfTFV2b1IwYSIsIm5iZiI6MTY1MjA5NDYwMywiYXpwIjoiWG5SakJLYnNTOFJBUDN2UGNSMWtfTFV2b1IwYSIsInNjb3BlIjoiZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTAxNjUyMDk0NjAyLCJpYXQiOjE2NTIwOTQ2MDMsImp0aSI6IjgzN2M5MDMxLTlkYTMtNDZhOS1hOGVmLTc3MGMwN2I3NWFjNSJ9.vH_RGuu-KO52oxq0SItg_tcNLg6cGmwbprUIZEydShNH66EeOLOVTFHzxnl6M8gqDku4gIi3oMpLvc1HGzRKFxu5f8nMQzQaIPXQbbpNuZ9bLolS_yIx6IJrs0EL-xpUo1Ii-l0CHulbDOn0tQ2kCP6b66dUmlqdikg06S8CkYJgZWhVz0mQW2lTrmqfhUTVhGqIeuZpt3uSL6_FhEy6btM--EiCyD0Q9tHx8Y452YYBq7Z_cFC74zjYy4SQEMjyzDExEeX7WLQc8MuD1sTPGq_qhZ54Qs6d3_kStLpNEQk8qpj7oBhWoRkC7JdGci8ZtSVj8WIGl3Wb5CLJvrJFNQ";
  private bearerDepl = "eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZG1pbiIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiWG5SakJLYnNTOFJBUDN2UGNSMWtfTFV2b1IwYSIsIm5iZiI6MTY1MjA5NDYyOCwiYXpwIjoiWG5SakJLYnNTOFJBUDN2UGNSMWtfTFV2b1IwYSIsInNjb3BlIjoiZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTAxNjUyMDk0NjI3LCJpYXQiOjE2NTIwOTQ2MjgsImp0aSI6IjYyZDg5ZThhLTE4N2UtNDc2Ny05YmU4LThkOGI1ZjQ1MmE4ZCJ9.UQg8ReHv_Fe_6bhwiEamkALHzRfucnSrhRCeFPQ1kMOPA9rYulsT1BaPjmMllTjkNbnQVWAKtobMKkfYvBeLY7RDS-1tTQFUO0k0QWSzr6KAJrq3AYj8_mCzNlhuFHJ0rpTlfhlRrE6k8-NKNPnJ9p_jdaZ09nTN-CbDjEk3vVcKLht-T6xrYCpDIMkRE-_XsORy0MjFviidy2VyKS2kipsJxTykRdt7kU3DloRr2RSe-vWQsA9_7kIgHuo6yoaNr8w8s2tAY_jA91CY2yqbz3GuLshNLiZLNxJF8MuQH--HcMhaY22mufb4mkzWS5oHt3EJI-YboGWQaA-L5lLflg";
  _http;
  result;

  constructor(private http: HttpClient) {
    this._http = new RxJSHttpClient();
  }



  setCredit(paramObject): any {


    var jsonObject = {
      "variables": {
        "ClientId": {
          "value": paramObject["clientId"],
          "type": "Integer"
        },
        "CreditId": {
          "value": paramObject["creditId"],
          "type": "Integer"
        },
        "DureeRemboursement": {
          "value": paramObject["duree"],
          "type": "Integer"
        },
        "revenuClient": {
          "value": paramObject["revenu"],
          "type": "Integer"
        },
        "mensualite": {
          "value": paramObject["duree"],
          "type": "Integer"
        },
        "AgeClient": {
          "value": paramObject["age"],
          "type": "Integer"
        },
        "email": {
          "value": paramObject["email"],
          "type": "string"
        },
        "type": {
          "value": "automobile",
          "type": "string"
        },
        "decision": {
          "value": true,
          "type": "Boolean"
        },
        "montant": {
          "value": paramObject["montant"],
          "type": "Long"
        }
      },
      "businessKey": "myBusinessKey",
      "withVariablesInReturn": true
    };

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer '+ this.bearerCamunda});


    return this.http.post(this.baseUrl, jsonObject, {
      headers: headers
    });
  }



  getSimulation(creditId) {
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').append('Authorization','Bearer '+this.bearerDepl);
    return this.http.post(`${this.baseUrlSimulation}/${creditId}`, { 
      headers: headers
    });
  }





}
