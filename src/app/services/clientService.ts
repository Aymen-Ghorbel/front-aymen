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
            'Authorization': 'Bearer eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZG1pbiIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiTk1Id2ZtYTE3YkhOeVJnR2x0V25mTXM2SjBJYSIsIm5iZiI6MTY1MzkxNzQyNSwiYXpwIjoiTk1Id2ZtYTE3YkhOeVJnR2x0V25mTXM2SjBJYSIsInNjb3BlIjoiZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTAwMTY1MzkxNzQyNCwiaWF0IjoxNjUzOTE3NDI1LCJqdGkiOiI5ZTI5YzdmNS0zOTMwLTQyNjItYTE1ZC0yNmFmYWFkOWUyNGUifQ.YSLdroIshcGEvUAvVtG-4fQDn7R5JcKfhCGEjBIOEPpj8gNAEjog7iKX4bS7SoV6WhjvMOEerGbobIw-dBrPnCdsDWBYGPcvYKIVZitVQ2P_8z_fCHIJCDsWo6MrkAXEh-cRQOKok1JfY7jrq4SKGMfPnlNWvSIWjZvEIk7ENd9tX38vSRohmvuyFGZU_mLw6SiHKjHqZjVuDlJ49AD4laR4JmSaQ4NPbhZT9feHoAiFzvJ13zqLV2_f5kmuP0c_PagvqIR5ZaxtUicK8DdMuvj0KZIA3FQCh0YFKEnBRFwSKZ-wGjb16OxQJyoZg8mi8xzGOvzfjFM1nSD1O4Havg'
        });

        return this.http.get(`${this.baseUrl}`, { headers: headers });

    }
   

    


}
