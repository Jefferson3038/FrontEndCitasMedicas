import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Citas } from '../models/citas';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private http:HttpClient) {}
  url:string="https://localhost:7265/api/citas";

  getCita(estatus:string){
    return this.http.get(this.url+`?A=${estatus}`);
  }

  addCita(cita:Citas):Observable<Citas>{
    return this.http.post<Citas>(this.url,cita);
  }

  updateCita(id:number, cita:Citas):Observable<Citas>{
    return this.http.put<Citas>(this.url+`/${id}`,cita);
  }

  deleteCita(id:number){
    return this.http.delete(this.url+`/${id}`);
  }
}
