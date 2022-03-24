import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marque } from '../models/marque';


@Injectable({
    providedIn: 'root'
})

export class MarqueService {

    private baseUrl = 'http://localhost:9008/api/marque';

    constructor(private http: HttpClient) { }

    //get all marque
    getMarqueList(): Observable<Object> {
        return this.http.get(`${this.baseUrl}`);
    }
   

    // product image

    addImage(L: File): Observable<any>{
        const file = new FormData();
         file.append('file', L);
        return this.http.put('http://localhost:9008/api/upload',file)
    }


    // get Marque by id
    getProduct(id: number): Observable<Object> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }


}
