import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuarios } from 'src/app/models/usuarios';
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

  constructor(private userService:UsuarioService, private dialog?:MatDialog) { }

  ngOnInit(): void {
    this.onDataTable();
  }

  onDataTable(){
    this.userService.getUsuarios("A").subscribe(res=>{
      this.datatable=res;
      console.log(res);
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

  onDelete(select:any):void{
    this.userService.deleteUsuarios(select.userCodigo).subscribe(res => {
      if(res){
        Swal.fire("Eliminado",'Se ha eliminado el usuario '+select.userNombre+' de manera exitosa','success')
        this.clear();
        this.onDataTable();
      } 
    });
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
}
