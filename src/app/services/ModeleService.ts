import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modele } from '../models/modele';


@Injectable({
    providedIn: 'root'
})

export class ModeleService {

    private baseUrl = 'http://localhost:9002/api/modele';

    constructor(private http: HttpClient) { }

    //get all modeles
    getMoldeleList(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
    }

     //get models by name
     getModelsByName(nom: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/modelsByName/${nom}`);
    }
   

    // product image

    addImage(L: File): Observable<any>{
        const file = new FormData();
         file.append('file', L);
        return this.http.put('http://localhost:9002/api/upload',file)
    }

    // add a  modele
    createModele(modele: Modele): Observable<object> {
        return this.http.post(`${this.baseUrl}`,modele);
    }

    // delete a modele
    deleteModele(id: number): Observable<any> {
        console.log(id);
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    // get Modele by id
    getModele(id: number): Observable<Object> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    // get Modele by brand
    // getModelsByBrand(idBrand: number): Observable<Object> {
    //     return this.http.get(`${this.baseUrl}/${idBrand}`);
    // }

    

    getModelsByBrand(idBrand: number): Observable<Object> {
        return this.http.get(`${this.baseUrl}/ModelsByBrand/${idBrand}`);
    }

    // update Modele
    updateModele (modele: Modele): Observable<Object> {
        return this.http.put(`${this.baseUrl}`,modele);
    }
// service Credit


emptyCredit():any{
    
    return this.http.get('http://20.82.207.118:8080/CreditClientIsEmpty',{headers: new HttpHeaders().set('Authorization', 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfdjFBcjdXaHo4dTNzUUFTdzZKZFhLVXRKaXpHMjFRQXM5aDlPU0VhNnVNIn0.eyJleHAiOjE2NDg0ODE3MDksImlhdCI6MTY0ODQ4MTQwOSwianRpIjoiN2Q0ZDAzMjMtODE5MC00MDAyLTlhMTUtNmNjZjIxZDU2YzJkIiwiaXNzIjoiaHR0cDovLzIwLjY3LjEzNC4xNjk6ODA4MC9hdXRoL3JlYWxtcy9jcmVkaXQtd29ya2Zsb3ciLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYmRkOWNlZmQtOWY0Mi00MWI1LTljOTUtYTZmZWFlYjM3ZTBmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjY1OWZjYjExLTRhODQtNGQ0Ny1iZWI3LWE5ZTAyMDVjMmY0OCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiIsImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMC8iLCJodHRwOi8vNTIuMTU2LjIwMy4xNTg6ODAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJNb3VhZGggTGFmaSIsInByZWZlcnJlZF91c2VybmFtZSI6Im1vdWFkaCIsImdpdmVuX25hbWUiOiJNb3VhZGgiLCJmYW1pbHlfbmFtZSI6IkxhZmkiLCJlbWFpbCI6ImxhZmkubW91YWRAZXNwcml0LnRuIn0.JIHa7uM43YE_KGBEmYdkJKZ4Yb-Jpk2TCBT0NKBDObiyXYjVlg_tEJJ4WuzOEhBdJ103rbp86oGkaRJVR6TZtn5AbHJuw4rjO6TUgI_ZJeVQPjkiYzcDzNmIBAQRjZr2OCVrJwsTcme8JV365LzY8_DXSyjZB-3zXVaYNkKyOOIB9l51c9VYBHv1rS5VwqIjCfOSSQh0PdyAjQzCOTqBB-jSE6Od22hIxK6viBrWz85oCWeKtyW0s_5WcMACHALTGxrkR8107RHeLjcZcMtWRPNgVYWWRssOHwWmE_fqI_MQ-2-8OvK4F2Am6iFMJE3I-zAKeY5Yuwrbq8cHE2MYGg')})
}

}
