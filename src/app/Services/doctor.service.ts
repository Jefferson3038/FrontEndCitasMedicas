import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../models/doctores';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) {}
  url:string="https://localhost:7265/api/doctores";

  getDoctor(estatus:string){
    return this.http.get(this.url+`?A=${estatus}`);
  }

  getDoctorId(id:number){
    return this.http.get(this.url+`/${id}`);
  }

  addDoctor(doctor:Doctor):Observable<Doctor>{
    return this.http.post<Doctor>(this.url,doctor);
  }

  updateDoctor(id:number, doctor:Doctor):Observable<Doctor>{
    return this.http.put<Doctor>(this.url+`/${id}`,doctor);
  }

  deleteDoctor(id:number){
    return this.http.delete(this.url+`/${id}`);
  }

  validacionesDoctor(doctor:Doctor){
    if(doctor.DocApellido==undefined || doctor.DocNombre==undefined){
      Swal.fire("Error","Favor verificar los campos usuario y contraseña",'error')
    }
  }
}
