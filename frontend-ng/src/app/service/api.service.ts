import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from "@angular/common/http";

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUri: string = `http://192.168.254.112:2606/api`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  downloadFile(full_path: string) {
    return this.http.get(`${this.baseUri}/download`, {params: {full_path: full_path}, responseType: "blob"})
    .pipe(catchError(this.errorMgmt));
  }

  getFiles() {
    return this.http.get(`${this.baseUri}`).pipe(catchError(this.errorMgmt));;
  }

  getSettings() {
    return this.http.get(`${this.baseUri}/setting`).pipe(catchError(this.errorMgmt));;
  }

  getAbout() {
    return this.http.get(`${this.baseUri}/about`).pipe(catchError(this.errorMgmt));;
  }

  // ERROR HANDLING
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
