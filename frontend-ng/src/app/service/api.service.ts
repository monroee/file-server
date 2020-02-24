import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUri:string = `http://localhost:2606/api`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) { }

  getFiles() {
    return this.http.get(`${this.baseUri}`);
  }

  getSettings(){
    return this.http.get(`${this.baseUri}/setting`);
  }

  getAbout(){
    return this.http.get(`${this.baseUri}/about`);
  }
}
