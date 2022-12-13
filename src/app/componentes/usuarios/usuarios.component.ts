import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuarios } from 'src/app/models/usuarios';
import { CitasService } from 'src/app/Services/citas.service';
import { UsuarioService } from 'src/app/Services/usuarios.service';
import Swal from 'sweetalert2';
import { ActualizaruserDialogComponent } from './actualizaruser-dialog/actualizaruser-dialog.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuario:Usuarios = new Usuarios();
  datatable:any = [];
  titulo:string="";
  validacionCitas:any=[];

  constructor(private userService:UsuarioService, private citasService:CitasService, private dialog?:MatDialog) { }

  ngOnInit(): void {
    this.onDataTable();
  }

  onDataTable(){
    this.userService.getUsuarios("A").subscribe(res=>{
      this.datatable=res;
      console.log(res);
    });
    this.citasService.getCita("A").subscribe(res=>{
      this.validacionCitas=res;
    });
    this.titulo="Usuarios";
  }

  onDataTableEliminados(){
    this.userService.getUsuarios("D").subscribe(res=>{
      this.datatable=res;
      console.log(res);
    });
    this.titulo="Usuarios eliminados";
  }

  openDialog(): void {
    if(this.dialog){
      const dialogRef = this.dialog.open(ActualizaruserDialogComponent, {
      width: '50%',
      height: '20.5rem',
      data: this.usuario
      });
      dialogRef.afterClosed().subscribe(
        res=>{
          this.onDataTable()
          console.log(res)
        }
      )
    }
  }

  onRestaurar(select:any):void{
    this.userService.updateUsuarios(select.userCodigo, select).subscribe(res => {
      if(res){
        this.onDataTableEliminados();
        Swal.fire("Restaurado",'Se ha restaurado el doctor '+select.userNombre+' de manera exitosa','success')
        this.clear();
      } else {
        alert('Error!')
      }
    })
  }

  onDelete(select:any){
    if (this.validacionEliminar(select.userCodigo)){
      this.eliminar(select)
    }
    else if(this.validacionEliminar(select.userCodigo)==false){
      Swal.fire("Error","No se puede borrar este usuario, porque esta asignado a una cita","error")
    }
  }
  
  eliminar(select:any):void{
    Swal.fire({
      title: "¿Esta seguro?",
      text: "Este elemento sera eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, mantener'
    }).then((result)=>{
      if(result.value){
        this.userService.deleteUsuarios(select.userCodigo).subscribe(res => {
          if(res){
            Swal.fire("Eliminado",'Se ha eliminado el usuario '+select.userNombre+' de manera exitosa','success')
            this.clear();
            this.onDataTable();
          } 
        });
      }
      return false
    })
  }

  onSetData(select:any){
    this.usuario.UserFechaCreacion=select.userFechaCreacion;
    this.usuario.UserCodigo=select.userCodigo;
    this.usuario.UserNombre=select.userNombre;
    this.usuario.UserPassword=select.userPassword;
    this.usuario.RlCodigo=select.rlCodigo;
    this.usuario.UserEstatus=select.userEstatus;
    this.openDialog();
  }

  clear(){
    this.usuario.UserCodigo=0;
    this.usuario.UserNombre="";
    this.usuario.UserPassword="";
    this.usuario.RlCodigo=0;
    this.usuario.UserEstatus="";
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
