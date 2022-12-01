import { Component,OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctores';
import { DoctorService } from 'src/app/Services/doctor.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/Services/usuarios.service';


@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css']
})
export class DoctoresComponent implements OnInit {
  doctor:Doctor = new Doctor();
  datatable:any = []; 
  
  constructor(private doctorService:DoctorService, private userService:UsuarioService,private dialog?:MatDialog){
  }


  ngOnInit(): void{
    this.onDataTable();
  }

  openDialog(): void {
    if(this.dialog){
      const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: this.doctor
      });
      dialogRef.afterClosed().subscribe(
        res=>{
          this.onDataTable()
          console.log(res)
        }
      )
    }
  }

  onDataTable(){
    this.doctorService.getDoctor().subscribe(res=>{
      this.datatable=res;
      console.log(res);
    });
  }

  onDeleteDoctor(select:any):void{
    this.userService.deleteUsuarios(select.docCodigo).subscribe(res=>{
      if (res){
        console.log(res)
      }
      else{
        alert('Error!')
      }
    });
    this.doctorService.deleteDoctor(select.docCodigo).subscribe(res => {
      if(res){
        Swal.fire("Eliminado",'Se ha eliminado el doctor '+this.doctor.DocNombre+' '+this.doctor.DocApellido+' de manera exitosa','success')
        this.clear();
        this.onDataTable();
      } else {
        alert('Error!')
      }
    });
  }

  onSetData(select:any){
    this.doctor.DocCodigo=select.docCodigo;
    this.doctor.DocNombre=select.docNombre;
    this.doctor.DocApellido=select.docApellido;
    this.doctor.DocTelefono=select.docTelefono;
    this.doctor.DocEmail=select.docEmail;
    this.doctor.DocEspecialidades=select.docEspecialidades;
    this.doctor.UserCodigo=select.userCodigo;
    this.doctor.DocHorarioInicial=select.docHorarioInicial;
    this.doctor.DocHorarioFinal=select.docHorarioFinal;
    this.openDialog();
  }

  clear(){
    this.doctor.DocCodigo=0;
    this.doctor.DocNombre="";
    this.doctor.DocApellido="";
    this.doctor.DocTelefono="";
    this.doctor.DocEmail="";
    this.doctor.DocEspecialidades="";
    this.doctor.UserCodigo="";
    this.doctor.DocHorarioInicial="";
    this.doctor.DocHorarioFinal="";
  }
}
