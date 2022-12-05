import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pacientes } from '../models/pacientes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private http:HttpClient) {}
  url:string="https://localhost:7265/api/pacientes";

  getPaciente(estatus:string){
    return this.http.get(this.url+`?A=${estatus}`);
  }
  addPaciente(paciente:Pacientes):Observable<Pacientes>{
    return this.http.post<Pacientes>(this.url,paciente);
  }

  updatePaciente(id:number, paciente:Pacientes):Observable<Pacientes>{
    return this.http.put<Pacientes>(this.url+`/${id}`,paciente);
  }

  deletePaciente(id:number){
    return this.http.delete(this.url+`/${id}`);
  }
}
