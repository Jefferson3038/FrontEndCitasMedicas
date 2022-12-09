import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuarios } from '../models/usuarios';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  
  constructor(private http:HttpClient) {}
  url:string="https://localhost:7265/api/usuario";

  getUsuarios(estatus:string){
    return this.http.get(this.url+`?A=${estatus}`);
  }
  addUsuarios(usuario:Usuarios):Observable<Usuarios>{
    this.validacionesUser(usuario);
    return this.http.post<Usuarios>(this.url,usuario);
  }

  updateUsuarios(id:number, usuario:Usuarios):Observable<Usuarios>{
    return this.http.put<Usuarios>(this.url+`/${id}`,usuario);
  }

  deleteUsuarios(id:number){
    return this.http.delete(this.url+`/${id}`);
  }

  validacionesUser(usuario:Usuarios){
    console.log(usuario)
    if(usuario.UserNombre==undefined || usuario.UserPassword==undefined){
      Swal.fire("Error","Favor verificar los campos usuario y contraseña",'error')
    }
  }
}
