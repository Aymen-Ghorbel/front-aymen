import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import {
  Modele
} from '../models/modele';

import {
  Observable,
  from
} from 'rxjs';

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
  private baseUrlAcceptSimulation = "https://localhost:8243/deploy/1.0/AcceptSimulation";
  private baseUrlavancementWorkflow = "https://localhost:8243/deploy/1.0/AvancementWorkflow";
  private baseUrlGenerateList = "http://20.67.133.33:8080/genereListDoc";
  private baseUrlSetCredit = "http://20.82.207.118:8080/Auto";
  private baseUrlSetCreditId = "https://localhost:8243/deploy/1.0/DemandeCreditAutomobile/2";
  private baseUrlGetCredit = "https://localhost:8243/deploy/1.0/CreditAutomobile";
  private baseUrlGetCreditById = "https://localhost:8243/deploy/1.0/CreditAuto";
  private bearerCamunda = "eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZG1pbiIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiTk1Id2ZtYTE3YkhOeVJnR2x0V25mTXM2SjBJYSIsIm5iZiI6MTY1Mjg2NzQ2OSwiYXpwIjoiTk1Id2ZtYTE3YkhOeVJnR2x0V25mTXM2SjBJYSIsInNjb3BlIjoiZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTAwMTY1Mjg2NzQ2OCwiaWF0IjoxNjUyODY3NDY5LCJqdGkiOiIzMWY3MDhlMi0xMDAyLTRlNTYtOTBjZS1iYjYyODFiY2RhODUifQ.HxNQvH6EVuKgv2R5xxjTpxrsBW7WATQOEVJOK697JwBA4o_lRWHjiA5K6AZVgLMgmSr1uti9dQ4_NzXyLWHvHI5oW5XP68CkFkxdXNMXJd3PI8a3k31y3CIupAvIjFArtrSOdN64oOSMpGbbKF9MoW3yJHlF2hjS1IJILB7vkGzHxi13ChXijcjWw3XsqarzKPSq5ks1yAQS7f4LmThpYIdYEQ9cyosRMLyyM6eyc1ApFHgqWUPRgnPRhgu4C6ugnARciR0UomRO914487_f_z02G8tGb_v1ZzgP2HtvtZFVLDeSZeu6h3DNWcAlxPUyrpGcghF9rZt_ZlfO7SSb8g";
  private bearerDepl = "eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZG1pbiIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiTk1Id2ZtYTE3YkhOeVJnR2x0V25mTXM2SjBJYSIsIm5iZiI6MTY1MzA1NTY3MCwiYXpwIjoiTk1Id2ZtYTE3YkhOeVJnR2x0V25mTXM2SjBJYSIsInNjb3BlIjoiZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTAwMTY1MzA1NTY2OSwiaWF0IjoxNjUzMDU1NjcwLCJqdGkiOiIyYzRmYzEzYy03NmJjLTRmMjctOGJiNi01NmU0ZmE5N2ZhN2EifQ.Pu4amGpRwGhqudGm0duAP_mMkr1gKsQJCOjw9ZAj2VJh46oPtiVgr-9pGp0w1U1uAtURimVRxTUucQOvPpjPd_juDEqwytgWIN8-svAZPKP-wT_ZT3RWYBx0ZSCm3FiHJ5N8J2aZ1suAvmJNf6Cq6QfR0tW1A6NKwIPDQM0jdhI1YV6eTU-Pc8xRniTqZ-sqiGHfdlP-lpbgKMB21apkR05wmG0Z3GdFbysDw-vQUcvTBSTaIsH0qC56d1LgHvbKcyUcOr0ER27tPcxVRE7OkoxJ-jeQ6oQsOrPk7eJsCGcOsvXswcI2a6f9GcLQJEgWgJ0Y7b9YXnN0Bf9f4O3Agg";
  result;
  
  lastCreditSimulation: any;
  creditId: any;
  type='Automobile';

  // Modele currentModel =new Modele();

  constructor(private http: HttpClient) {}

  setCredit(formData: FormData): any {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZG1pbiIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiTk1Id2ZtYTE3YkhOeVJnR2x0V25mTXM2SjBJYSIsIm5iZiI6MTY1MzA1NTY3MCwiYXpwIjoiTk1Id2ZtYTE3YkhOeVJnR2x0V25mTXM2SjBJYSIsInNjb3BlIjoiZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTAwMTY1MzA1NTY2OSwiaWF0IjoxNjUzMDU1NjcwLCJqdGkiOiIyYzRmYzEzYy03NmJjLTRmMjctOGJiNi01NmU0ZmE5N2ZhN2EifQ.Pu4amGpRwGhqudGm0duAP_mMkr1gKsQJCOjw9ZAj2VJh46oPtiVgr-9pGp0w1U1uAtURimVRxTUucQOvPpjPd_juDEqwytgWIN8-svAZPKP-wT_ZT3RWYBx0ZSCm3FiHJ5N8J2aZ1suAvmJNf6Cq6QfR0tW1A6NKwIPDQM0jdhI1YV6eTU-Pc8xRniTqZ-sqiGHfdlP-lpbgKMB21apkR05wmG0Z3GdFbysDw-vQUcvTBSTaIsH0qC56d1LgHvbKcyUcOr0ER27tPcxVRE7OkoxJ-jeQ6oQsOrPk7eJsCGcOsvXswcI2a6f9GcLQJEgWgJ0Y7b9YXnN0Bf9f4O3Agg'
    });

    let options = {
      headers: headers
    };

    return this.http.post(this.baseUrlSetCreditId, formData, options);
  }

  getCredit(): any {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + this.bearerDepl
    });

    let options = {
      headers: headers
    };

    return this.http.get(this.baseUrlGetCredit, options);
  }

  getCreditById(idCredit:number): any {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + this.bearerDepl
    });

    let options = {
      headers: headers
    };

    return this.http.get(`${this.baseUrlGetCreditById}/${idCredit}`, options);
  }

  setCamunda(creditId: number, montant:any): any {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZG1pbiIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiTk1Id2ZtYTE3YkhOeVJnR2x0V25mTXM2SjBJYSIsIm5iZiI6MTY1Mjg2NzQ2OSwiYXpwIjoiTk1Id2ZtYTE3YkhOeVJnR2x0V25mTXM2SjBJYSIsInNjb3BlIjoiZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTAwMTY1Mjg2NzQ2OCwiaWF0IjoxNjUyODY3NDY5LCJqdGkiOiIzMWY3MDhlMi0xMDAyLTRlNTYtOTBjZS1iYjYyODFiY2RhODUifQ.HxNQvH6EVuKgv2R5xxjTpxrsBW7WATQOEVJOK697JwBA4o_lRWHjiA5K6AZVgLMgmSr1uti9dQ4_NzXyLWHvHI5oW5XP68CkFkxdXNMXJd3PI8a3k31y3CIupAvIjFArtrSOdN64oOSMpGbbKF9MoW3yJHlF2hjS1IJILB7vkGzHxi13ChXijcjWw3XsqarzKPSq5ks1yAQS7f4LmThpYIdYEQ9cyosRMLyyM6eyc1ApFHgqWUPRgnPRhgu4C6ugnARciR0UomRO914487_f_z02G8tGb_v1ZzgP2HtvtZFVLDeSZeu6h3DNWcAlxPUyrpGcghF9rZt_ZlfO7SSb8g'
    });

    let jsonObject = {
      "variables": {
        "ClientId": {
          "value": 2,
          "type": "Integer"
        },
        "CreditId": {
          "value": creditId,
          "type": "Integer"
        },
        "DureeRemboursement": {
          "value": 20,
          "type": "Integer"
        },
        "mensualite": {
          "value": 200,
          "type": "Integer"
        },
        "AgeClient": {
          "value": 35,
          "type": "Integer"
        },
        "email": {
          "value": "assil.jaber@esprit.tn",
          "type": "string"
        },
        "type": {
          "value": "Automobile",
          "type": "string"
        },
        "revenuClient": {
          "value": 1800,
          "type": "Integer"
        },
        "decision": {
          "value": true,
          "type": "Boolean"
        },
        "Montant": {
          "value": montant,
          "type": "Long"
        }
      },
      "businessKey": "myBusinessKey",
      "withVariablesInReturn": true
    };

    return this.http.post(this.baseUrl, jsonObject, {
      headers: headers
    });
  }

  getSimulation(creditId) {
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').append('Authorization', 'Bearer ' + this.bearerDepl);
    return this.http.get(`${this.baseUrlSimulation}/${creditId}`, {
      headers: headers
    });
  }

  getLastCreditByEmail(): any {
    //we can set a credit only with the user "assil" so we will only need this url for getting the credit
    let URL= "https://localhost:8243/deploy/1.0/creditAuto/assil.jaber%40esprit.tn";

    let lastCredit: any;

    let headers= new HttpHeaders({
      'Authorization': 'Bearer '+this.bearerDepl
    });

    let options = {
      headers: headers
    };

    return this.http.get(URL, options)

  }

  acceptSimulation(idCredit): any {
    let headers= new HttpHeaders({
      'Authorization': 'Bearer '+this.bearerDepl
    });

    let options = {
      headers: headers
    };

    let body = new HttpParams();
    body = body.set('id', idCredit);
    body = body.set('type', 'Automobile');
    body = body.set('stat', 'ok');

    return this.http.post(this.baseUrlAcceptSimulation, body, options);
  }

  //List in wich we upload the 6 needed documents
  generateList(idClient: number): any {
    return this.http.get(`${this.baseUrlGenerateList}/${idClient}/${this.type}`);
  }

  avancementWorkflow(idCredit: number): any{

    let headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.bearerDepl
    });

    let options = {headers: headers};

    let body = new HttpParams();

    body = body.set('stat', 'ok');

    return this.http.post(`${this.baseUrlavancementWorkflow}/${this.type}/${idCredit}`,body,options);
  }

}
