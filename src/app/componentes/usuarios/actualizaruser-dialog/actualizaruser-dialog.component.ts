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
  validacionCitas:any=[];

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

  onDelete(usuario:Usuarios){
    if (this.validacionEliminar(usuario.UserCodigo)){
      this.eliminar(usuario)
    }
    else if(this.validacionEliminar(usuario.UserCodigo)==false){
      Swal.fire("Error","No se puede borrar este usuario, porque esta asignado a una cita","error")
    }
  }

  eliminar(usuario:Usuarios):void{
    Swal.fire({
      title: "¿Esta seguro?",
      text: "Este elemento sera eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, mantener'
    }).then((result)=>{
      if(result.value){
        this.userService.deleteUsuarios(usuario.UserCodigo).subscribe(res => {
          if(res){
            this.cerrarDialog();
            this.clear();
            Swal.fire("Eliminado",'Se ha eliminado el usuario '+this.usuario.UserNombre+' de manera exitosa','success')
          } else {
            alert('Error!')
          }
        });
      }
      return false
    })
  }

 cerrarDialog():void{
   this.dialogRef.close();
 }
 validacionEliminar(id:number){
  let validacion:boolean=true;
  let valor:number=0;
  for(let item of this.validacionCitas){
     valor = item.pacCodigo
    if(valor==id){
      validacion=false;
      break;
    }
    valor=item.docCodigo
    if(valor==id){
      validacion=false;
      break;
    }
  }
  return validacion
}

}
