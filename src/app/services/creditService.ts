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
  private baseUrlSimulationWSO2 = "https://localhost:8243/deploy/1.0/CreditAuto";
  private baseUrlSimulation = "http://20.82.207.118:8080/Auto";
  private bearerCamunda = "eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZG1pbiIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiTk1Id2ZtYTE3YkhOeVJnR2x0V25mTXM2SjBJYSIsIm5iZiI6MTY1MjY5NjkzOCwiYXpwIjoiTk1Id2ZtYTE3YkhOeVJnR2x0V25mTXM2SjBJYSIsInNjb3BlIjoiZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTY1MjcwMDUzOCwiaWF0IjoxNjUyNjk2OTM4LCJqdGkiOiJhNGE4OWY5Ni1mNzJkLTRkOTUtYmFkMC1jOGRmMDIwYjdkNGEifQ.nY34W8vReGLQviJfu_DguN_e5noB04cABYFdLRGvw9y8RNuL82Xk6aOWL6yOuW5NPZAN3pNOO0Z21fQyEHyhIhw99yF3Y5K_m79iEcEp26AeAAaKr72mltRh2IeWLXs28PQDljTeEwj0XQY_MbWY8kslumX5vCyAnlgrpChC791JPHp5_oMqp5-xmaBO-KIexfRFRRXlh7X93DRMU2_Njtuc7SmkU4yqmGr2Dijyffn9rsoLcd6HXzCdordusgmwVMGCAj2JtVJLMegkISRhclbjDcqN46JAHTW3OFftpAUD-tZGCrlZurwKx0tfyBiEN-sdG4OOvNvNuKmk2sADMw";
  private bearerDepl = "eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZG1pbiIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiTk1Id2ZtYTE3YkhOeVJnR2x0V25mTXM2SjBJYSIsIm5iZiI6MTY1MjY5NzAyMCwiYXpwIjoiTk1Id2ZtYTE3YkhOeVJnR2x0V25mTXM2SjBJYSIsInNjb3BlIjoiZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTAwMTY1MjY5NzAxOSwiaWF0IjoxNjUyNjk3MDIwLCJqdGkiOiIxZDJhNzIwNy1lN2MwLTQ5NmYtYTc3OS0wMWMwMGNjZWFhMTMifQ.eTJGEoBHSqzld-LI_a6eBpRV6XVKTluSBAEdZpkPYlPtAu_esZu_Sw-SeDAMk2pkbv5BbQgItndEw9Z5ZGjZAfuQRUynEDxWo-aYAtySv1GU2ucuX9AywFthXBKZyX8F4dbi6zEEs6anpY1sc9CAAi0ajsS67HwQaitbFY-J83BjLt4HQFwjqnjusd5NWnIkkbJAIb7hQVeZxahEStavCqqoNjn1p5yX0DrcNSIv7T_VOFbXnHlijxWQgBXpRUKEsb7DNxq_P_hthd5tUg459qDsNgcX9MtpxenwGfNXGjqXiKCMcwtErOrqkxZLLT2TawBp_52W6yjZk93vrokmJw";
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
    return this.http.get(`${this.baseUrlSimulation}/${creditId}`, { 
      headers: headers
    });
  }

  getSimulationByEmail(clientEmail) {
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').append('Authorization','Bearer '+this.bearerDepl);
    return this.http.get(`${this.baseUrlSimulation}/${clientEmail}`, { 
      headers: headers
    });
  }






}
