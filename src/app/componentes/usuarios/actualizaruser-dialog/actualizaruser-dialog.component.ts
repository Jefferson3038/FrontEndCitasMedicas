import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/Services/usuarios.service';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizaruser-dialog',
  templateUrl: './actualizaruser-dialog.component.html',
  styleUrls: ['./actualizaruser-dialog.component.css']
})
export class ActualizaruserDialogComponent implements OnInit {

  constructor(private userService:UsuarioService, public dialogRef:MatDialogRef<ActualizaruserDialogComponent>, @Inject(MAT_DIALOG_DATA) public usuario:Usuarios) {   
  }
  
 ngOnInit(): void {
 }

 onUpdate(usuario:Usuarios):void{
   this.userService.updateUsuarios(usuario.UserCodigo, usuario).subscribe(res => {
     if(res){
       Swal.fire("Actualizado",'Se ha actualizado el doctor '+this.usuario.UserNombre+' de manera exitosa','success')
       this.cerrarDialog();
       this.clear();
     } else {
       alert('Error!')
     }
   })
 }

 clear(){
  this.usuario.UserCodigo=0;
  this.usuario.UserNombre="";
  this.usuario.UserPassword="";
  this.usuario.RlCodigo=0;
  this.usuario.UserEstatus="";
  }

  onDelete(select:any):void{
    this.userService.deleteUsuarios(select.docCodigo).subscribe(res => {
      if(res){
        Swal.fire("Eliminado",'Se ha eliminado el usuario '+this.usuario.UserNombre+' de manera exitosa','success')
        this.clear();
      } else {
        alert('Error!')
      }
    });
  }

 cerrarDialog():void{
   this.dialogRef.close();
 }

}
