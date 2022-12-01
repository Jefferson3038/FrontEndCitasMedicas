import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pacientes } from 'src/app/models/pacientes';
import { PacientesService } from 'src/app/Services/pacientes.service';
import { UsuarioService } from 'src/app/Services/usuarios.service';
import { ActualizarPacienteComponent } from './actualizar-paciente/actualizar-paciente.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  paciente:Pacientes = new Pacientes();
  datatable:any = []; 
  
  constructor(private pacienteService:PacientesService, private userService:UsuarioService,private dialog?:MatDialog){
  }


  ngOnInit(): void{
    this.onDataTable();
  }

  openDialog(): void {
    if(this.dialog){
      const dialogRef = this.dialog.open(ActualizarPacienteComponent, {
      width: '50%',
      data: this.paciente
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
    this.pacienteService.getPaciente().subscribe(res=>{
      this.datatable=res;
      console.log(res);
    });
  }

  onDelete(select:any):void{
    this.userService.deleteUsuarios(select.userCodigo).subscribe(res=>{
      if (res){
        console.log(res)
      }
      else{
        alert('Error!')
      }
    });
    this.pacienteService.deletePaciente(select.pacCodigo).subscribe(res => {
      if(res){
        Swal.fire("Eliminado",'Se ha eliminado el paciente '+this.paciente.PacNombre+' '+this.paciente.PacApellido+' de manera exitosa','success')
        this.clear();
        this.onDataTable();
      } else {
        alert('Error!')
      }
    });
  }

  onSetData(select:any){
    this.paciente.PacCodigo=select.pacCodigo;
    this.paciente.PacNombre=select.pacNombre;
    this.paciente.PacApellido=select.pacApellido;
    this.paciente.PacTelefono=select.pacTelefono;
    this.paciente.PacEmail=select.pacEmail;
    this.paciente.PacFechaNacimiento=select.pacFechaNacimiento;
    this.paciente.UserCodigo=select.userCodigo;
    this.paciente.PacDireccion=select.pacDireccion;
    this.openDialog();
  }

  clear(){
    this.paciente.PacCodigo=0;
    this.paciente.PacNombre="";
    this.paciente.PacApellido="";
    this.paciente.PacTelefono="";
    this.paciente.PacEmail="";
    this.paciente.PacFechaNacimiento="";
    this.paciente.UserCodigo=0;
    this.paciente.PacDireccion="";
  }
}
