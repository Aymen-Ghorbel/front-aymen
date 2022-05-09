import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
        return this.http.get(`${this.baseUrl}`);
    }
   

    


}
