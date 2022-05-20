import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marque } from '../models/marque';


@Injectable({
    providedIn: 'root'
})

export class clientService {

    private baseUrl = 'https://localhost:8243/deploy/1.0/Client/2';

    constructor(private http: HttpClient) { }

    //get client by id
    getClientById(): Observable<Object> {

        let headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ'});

        return this.http.post(`${this.baseUrl}`, { headers: headers });

    }
   

    


}
