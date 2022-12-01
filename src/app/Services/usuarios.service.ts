import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  
  constructor(private http:HttpClient) {}
  url:string="https://localhost:7265/api/usuario";

  getUsuarios(){
    return this.http.get(this.url);
  }
  addUsuarios(usuario:Usuarios):Observable<Usuarios>{
    return this.http.post<Usuarios>(this.url,usuario);
  }

  updateUsuarios(id:number, usuario:Usuarios):Observable<Usuarios>{
    return this.http.put<Usuarios>(this.url+`/${id}`,usuario);
  }

  deleteUsuarios(id:number){
    return this.http.delete(this.url+`/${id}`);
  }
}
