import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Citas } from '../models/citas';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private http:HttpClient) {}
  url:string="https://localhost:7265/api/citas";

  getCita(estatus:string, id?:number){
    if(id==undefined){
      return this.http.get(this.url+`?A=${estatus}`);
    }
    return this.http.get(this.url+`?A=${estatus}`+`&id=${id}`);
  }

  addCita(cita:Citas):Observable<Citas>{
    return this.http.post<Citas>(this.url,cita);
  }

  updateCita(id:number, cita:Citas):Observable<Citas>{
    return this.http.put<Citas>(this.url+`/${id}`,cita).pipe(
      catchError(this.errorHandler)
    );
  }

  deleteCita(id:number){
    return this.http.delete(this.url+`/${id}`);
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.message);
  }
}
